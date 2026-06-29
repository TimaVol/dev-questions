---
title: "Що таке callback у JavaScript?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 38
difficulty: easy
---

## Відповідь

**Callback** — функція, передана як аргумент і викликана пізніше, коли async операція завершиться. Класичний Node.js стиль: `fs.readFile(path, (err, data) => {})` — error-first convention.

Проблеми: callback hell (nested callbacks), складна error propagation, важко паралелити.

Сучасний backend: Promises/async-await. Callbacks лишаються в EventEmitter, streams, legacy APIs.

## Приклад

```js
import { readFile } from 'node:fs';

// Callback style (legacy)
readFile('config.json', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(JSON.parse(data));
});

// Modern equivalent
const data = await readFile('config.json', 'utf8');
console.log(JSON.parse(data));
```

## Юз кейси

- `server.on('request', callback)` — EventEmitter pattern
- promisify legacy callback API: `util.promisify(readFile)`
- Middleware `next()` — callback для chain continuation

## Документація

- [Callbacks → Promises — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
