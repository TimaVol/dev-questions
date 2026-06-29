---
title: "Яка різниця у використанні ES modules і CommonJS модулів?"
topic: nodejs
grade: middle
category: "Node.js"
order: 16
difficulty: easy
---

## Відповідь

**ES Modules (ESM)**: `import`/`export`, статичний аналіз, top-level await, `"type": "module"` у package.json або `.mjs`.

**CommonJS (CJS)**: `require()`/`module.exports`, синхронне завантаження, стандарт у Node.js до ESM.

Відмінності: ESM — живі прив'язки, CJS — копіювання значень; ESM не можна require без createRequire; взаємодія через `import pkg from 'cjs-pkg'` (default export). Новий код — ESM; застарілі npm-пакети часто CJS.

## Приклад

```js
// ESM (package.json: "type": "module")
import fs from 'node:fs/promises';
export async function loadConfig() {
  return JSON.parse(await fs.readFile('config.json', 'utf8'));
}

// CommonJS
const fs = require('node:fs/promises');
module.exports.loadConfig = async () => { /* ... */ };
```

## Юз кейси

- Проєкти NestJS/Fastify на ESM з `"type": "module"`
- Застарілий Express-додаток на CJS — поступова міграція через `.cjs`/`.mjs`
- Динамічний import: `await import('./heavy-module.js')` для відкладеного завантаження

## Документація

- [ES modules — Node.js](https://nodejs.org/api/esm.html)
