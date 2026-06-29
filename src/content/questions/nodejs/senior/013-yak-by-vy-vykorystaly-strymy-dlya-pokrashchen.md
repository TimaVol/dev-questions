---
title: "Як би ви використали стрими для покращення продуктивності вебзастосунку?"
topic: nodejs
grade: senior
category: "Node.js"
order: 13
difficulty: hard
---

## Відповідь

Streams дозволяють обробляти дані chunk-by-chunk без завантаження всього в RAM — критично для file upload/download, CSV export, proxying, SSE. `pipeline()` автоматично propagate errors і backpressure.

Backpressure: коли consumer повільніший за producer, `write()` повертає false — pause source до `drain`. Без цього — memory spike і OOM. Transform streams для on-the-fly gzip, JSON lines parsing, image resize.

HTTP response streaming зменшує TTFB: клієнт починає отримувати дані до завершення DB query на великому dataset.

## Приклад

```js
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

await pipeline(
  createReadStream('export.csv'),
  createGzip(),
  createWriteStream('export.csv.gz')
);

// Streaming HTTP response
app.get('/export', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.queryCursor('SELECT * FROM orders').pipe(res);
});
```

## Юз кейси

- Export 10GB CSV без heap exhaustion
- Reverse proxy large file upload через Busboy → S3 multipart
- Real-time log tailing через SSE + Readable stream

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
