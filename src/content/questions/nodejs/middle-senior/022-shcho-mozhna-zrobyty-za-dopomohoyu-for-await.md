---
title: "Що можна зробити за допомогою for await з request: IncomingMessage?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 22
difficulty: hard
---

## Відповідь

`IncomingMessage` extends `Readable` — async iterable з Node 10+. `for await (const chunk of req)` читає тіло **потоково**, без буферизації всього запиту в пам'ять. Корисно для: рядків NDJSON, парсингу chunked upload, SSE, proxy pass-through. Комбінуйте з `pipeline`, лімітами розміру (accumulator + abort), timeout. Для JSON-тіла краще `stream/consumers.json()` або middleware — але for-await дає контроль над частковим читанням.

## Приклад

```js
import { createServer } from 'node:http';

createServer(async (req, res) => {
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1_000_000) {
      res.writeHead(413).end('too large');
      req.destroy();
      return;
    }
    processChunk(chunk);
  }
  res.end('ok');
}).listen(3000);
```

## Юз кейси

- Streaming upload до S3/GCS без тимчасового файлу
- Line-by-line log ingestion API
- Webhook receiver з великим payload

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
