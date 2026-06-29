---
title: "Чого не вистачає у ESM, що підтримується у CJS?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 9
difficulty: hard
---

## Відповідь

ESM не має синхронного `require()` — лише асинхронний `import()`. Немає `__dirname`/`__filename` (заміна: `import.meta.url` + `fileURLToPath`). Немає `require.main === module` для визначення точки входу. `require.extensions` / умовні `require` hooks — лише CJS. Імпорти ESM статичні (top-level); dynamic import — async. `module.exports` vs named `export` — взаємодія через `createRequire` або обгортку default export. ESM завжди в strict mode; CJS може бути sloppy. `import.meta.resolve()` (Node 20+) частково замінює `require.resolve`.

## Приклад

```js
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Interop: CJS пакет з ESM
const require = createRequire(import.meta.url);
const legacy = require('some-cjs-only-lib');
```

## Юз кейси

- Міграція моноліту з CJS на `"type": "module"`
- CLI-інструменти з `__dirname` для шляхів до config
- Dual package hazard (CJS + ESM exports у npm)

## Документація

- [ES modules — Node.js](https://nodejs.org/api/esm.html)
