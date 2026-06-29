---
title: "Що таке стрим (stream)?"
topic: nodejs
grade: junior
category: "Node.js"
order: 11
difficulty: easy
---

## Відповідь

Stream — це абстракція для послідовної обробки даних частинами (chunks), без завантаження всього об'єму в пам'ять. У Node є чотири типи: Readable (читання), Writable (запис), Duplex (читання+запис), Transform (перетворення на льоту). Механізм **backpressure** (`pause`/`resume`, `pipe`) не дає швидкому producer перевантажити повільний consumer.

## Приклад

```js
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

createReadStream('input.log')
  .pipe(createGzip())
  .pipe(createWriteStream('input.log.gz'));
```

## Юз кейси

- Стрімінг HTTP-відповіді з великого файлу
- ETL-пайплайн: read → parse → transform → write в БД
- Обробка upload-файлів через `req.pipe(writeStream)`

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
