---
title: "Наведіть приклад патерну adapter з вбудованих бібліотек."
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 37
difficulty: hard
---

## Відповідь

Патерн Adapter перетворює один інтерфейс на інший, очікуваний клієнтом. Це типовий спосіб підключити старі callback-API або веб-стандарти до сучасного async-коду без переписування бібліотек. У ядрі Node: **`stream.Readable.from(asyncIterable)`** — перетворення Iterable у Node Stream API. **`stream.promises.pipeline`** — callback streams у Promise API. **`util.promisify(fn)`** — callback-last у Promise. **`fs/promises`** — callback fs у async/await. **`Buffer.from(string, encoding)`** — рядок у binary і назад. **`Readable.toWeb()` / `Readable.fromWeb()`** — Node Stream і WHATWG ReadableStream (тіло fetch).

## Приклад

```js
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import { promisify } from 'node:util';
import { gzip } from 'node:zlib';

const gzipAsync = promisify(gzip);

// Callback API → Promise
const compressed = await gzipAsync(Buffer.from('hello'));

// Async iterable → Node stream (adapter)
const stream = Readable.from(async function* () {
  yield* ['chunk1', 'chunk2'];
});
await pipeline(stream, createWriteStream('out.txt'));
```

## Юз кейси

- Інтеграція callback npm-бібліотеки в async/await кодову базу
- Проксі тіла fetch Response через Node pipeline
- Міграція legacy коду без переписування

## Документація

- [Adapter pattern](https://refactoring.guru/design-patterns/adapter)
