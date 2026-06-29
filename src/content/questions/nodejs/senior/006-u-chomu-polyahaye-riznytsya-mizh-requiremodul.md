---
title: "У чому полягає різниця між require/module.exports і ES6-модулями?"
topic: nodejs
grade: senior
category: "Node.js"
order: 6
difficulty: hard
---

## Відповідь

CommonJS (`require`/`module.exports`) — синхронне завантаження, dynamic require можливий, exports — копія посилань (live binding для `module.exports = obj`). ESM (`import`/`export`) — static analysis, hoisting imports, tree-shaking, top-level await, `import()` для dynamic.

Node підтримує обидва: `.mjs` або `"type": "module"` в package.json для ESM; interop через `createRequire` або default export wrapper. CJS не може `require()` ESM напряму — потрібен dynamic import.

Для нових сервісів — ESM + TypeScript. CJS залишається в legacy та деяких tooling chains. Circular dependencies поводяться інакше в обох системах.

## Приклад

```js
// CommonJS
module.exports = { createUser };

// ESM
export function createUser(data) { /* ... */ }
export default class UserRepo { /* ... */ }
```

```js
// Dynamic import у CJS контексті
const { createUser } = await import('./user-service.js');
```

## Юз кейси

- Вибір module system для нового NestJS/Express monorepo
- Міграція пакета з CJS на ESM без breaking consumers
- Налаштування Jest/Vitest з mixed module types

## Документація

- [ES modules — Node.js](https://nodejs.org/api/esm.html)
- [Modules — Node.js](https://nodejs.org/api/modules.html)
