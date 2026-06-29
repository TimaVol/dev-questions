---
title: "Як зробити перевизначення write для екземпляру Writable без створення класу спадкоємця?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 15
difficulty: medium
---

## Відповідь

Три підходи без `extends Writable`: (1) **monkey-patch** `_write` на instance — `stream._write = function(chunk, enc, cb) { ... }`; (2) **`Duplex.from`** або `Transform` wrapper; (3) **конструктор `Writable`** з опцією `{ write(chunk, enc, cb) }` (Node 17+). Для one-off — `new Writable({ write() {} })` найчистіше. Пам'ятайте про `_writev`, `final`, `destroy`, якщо потрібен повний lifecycle.

## Приклад

```js
import { Writable } from 'node:stream';

const logger = new Writable({
  write(chunk, encoding, callback) {
    process.stdout.write(`[LOG] ${chunk}`);
    callback();
  },
});

// Або patch існуючого instance
const fileStream = fs.createWriteStream('out.log');
const origWrite = fileStream._write.bind(fileStream);
fileStream._write = (chunk, enc, cb) => {
  origWrite(Buffer.from(`prefix:${chunk}`), enc, cb);
};
```

## Юз кейси

- Ad-hoc transform у pipeline без окремого класу
- Logging/metrics tap на існуючий stream
- Розширення prototype в legacy коді

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
