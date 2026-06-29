---
title: "Як працювати із вбудованими Node.js функціями, реалізованими через callback інтерфейс в async/await стилі?"
topic: nodejs
grade: senior
category: "Node.js"
order: 5
difficulty: hard
---

## Відповідь

Три підходи: `util.promisify` для callback-last API (`fs.readFile`, `dns.lookup`); вбудовані Promise-версії (`fs/promises`, `timers/promises`); ручна обгортка через `new Promise((resolve, reject) => ...)`.

Callback API використовує error-first convention: `(err, result) =>`. При promisify помилка першого аргумента стає rejection. Для API з custom callback signature — `promisify.custom`. У production обгортайте на рівні repository layer, не розкидайте promisify по handlers.

У NestJS/Fastify це частина infrastructure; business logic працює лише з async/await.

## Приклад

```js
import { promisify } from 'node:util';
import { readFile } from 'node:fs';
import { readFile as readFileP } from 'node:fs/promises';

const readFileCb = promisify(readFile);

async function loadConfig(path) {
  const buf = await readFileP(path, 'utf8');
  return JSON.parse(buf);
}
```

## Юз кейси

- Міграція legacy Express-коду з callbacks на async handlers
- Обгортка сторонньої lib без Promise API
- Уніфікація error handling через try/catch замість if (err)

## Документація

- [async/await — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [util.promisify — Node.js](https://nodejs.org/api/util.html#utilpromisifyoriginal)
