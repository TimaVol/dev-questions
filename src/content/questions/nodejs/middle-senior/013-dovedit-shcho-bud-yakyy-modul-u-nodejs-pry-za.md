---
title: "Доведіть, що будь-який модуль у Node.js при завантаженні огортається у функцію і створює замикання?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 13
difficulty: medium
---

## Відповідь

Node CJS обгортає код модуля у функцію `(function (exports, require, module, __filename, __dirname) { ... })`. Top-level `const`/`let` — **локальні** для цієї функції, не global — це замикання. Module cache (`require.cache`) зберігає один instance exports на шлях — singleton через closure. ESM не обгортає у таку функцію, але має module scope (також не global). Доведення: top-level змінні в CJS модулі недоступні з іншого модуля без export.

## Приклад

```js
// counter.js (CJS)
let count = 0; // замикання всередині module wrapper
module.exports = {
  inc: () => ++count,
  get: () => count,
};

// app.js
const a = require('./counter');
const b = require('./counter');
a.inc();
console.log(b.get()); // 1 — той самий closure, той самий cache entry
```

## Юз кейси

- Module pattern для приватного стану без classes
- Розуміння чому `require` двічі не re-executes module
- Mocking у тестах через `require.cache` delete

## Документація

- [Modules — Node.js](https://nodejs.org/api/modules.html)
- [Closures — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
