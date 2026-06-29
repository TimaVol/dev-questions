---
title: "Що таке back pressure для стримів? Що спричинила б його відсутність?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 5
difficulty: hard
---

## Відповідь

Backpressure — механізм, коли повільний **consumer** сигналізує швидкому **producer** припинити подачу даних, поки буфер не звільниться. У Node streams: `writable.write()` повертає `false` → producer викликає `readable.pause()` або чекає події `drain`. `pipe()` робить це автоматично. Без backpressure — необмежене накопичення chunk-ів у пам'яті → зростання RSS → GC thrashing → OOM kill. Особливо критично при upload/download, log pipelines, transform streams.

## Приклад

```js
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

// pipeline коректно обробляє backpressure і помилки
await pipeline(
  createReadStream('large.bin'),
  async function* (source) {
    for await (const chunk of source) yield transform(chunk);
  },
  createWriteStream('out.bin'),
);
```

## Юз кейси

- Streaming HTTP response без буферизації всього body
- ETL-пайплайни (read → transform → S3 upload)
- Захист від slow-client атак (повільне читання response)

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
- [Backpressuring — Node.js](https://nodejs.org/en/docs/guides/backpressuring-in-streams)
