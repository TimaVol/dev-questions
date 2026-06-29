---
title: "Чому потрібно додавати префікс node: при завантаженні вбудованих модулів?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 21
difficulty: hard
---

## Відповідь

`node:` prefix (Node 14.18+, 16+) явно позначає **core built-in module** — `import fs from 'node:fs'`. Без prefix `require('fs')` може бути перехоплений npm-пакетом `fs` у `node_modules` (dependency confusion / supply chain). Prefix гарантує завантаження саме з Node core, не з userland. Також покращує static analysis і IDE autocomplete. Рекомендація ESLint `prefer-node-protocol`. Працює з `require('node:fs')` і `import`.

## Приклад

```js
// Небезпечно, якщо хтось опублікував пакет "fs"
const sneaky = require('fs'); // може бути npm package

// Гарантовано core module
import fs from 'node:fs/promises';
import { createServer } from 'node:http';
```

## Юз кейси

- Security hardening у enterprise monorepos
- ESLint policy для всіх internal services
- Уникнення shadowing при npm dependency attacks

## Документація

- [node: imports — Node.js](https://nodejs.org/api/esm.html#node-imports)
