---
title: "Наведіть приклади роботи зі стримами різних типів."
topic: nodejs
grade: middle
category: "Node.js"
order: 30
difficulty: medium
---

## Відповідь

Типи streams у Node.js:

- **Readable** — `fs.createReadStream`, `http.IncomingMessage`
- **Writable** — `fs.createWriteStream`, `http.ServerResponse`
- **Duplex** — `net.Socket`, `PassThrough`
- **Transform** — `zlib.createGzip`, custom line parser

Object mode streams — chunks як objects, не Buffer.

## Приклад

```js
import { Transform, pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { createReadStream, createWriteStream } from 'node:fs';

const parseJsonLines = new Transform({
  objectMode: true,
  transform(chunk, _enc, cb) {
    for (const line of chunk.toString().split('\n')) {
      if (line.trim()) this.push(JSON.parse(line));
    }
    cb();
  },
});

await promisify(pipeline)(
  createReadStream('events.ndjson'),
  parseJsonLines,
  async function* (source) {
    for await (const event of source) {
      if (event.type === 'purchase') yield JSON.stringify(event) + '\n';
    }
  },
  createWriteStream('purchases.ndjson'),
);
```

## Юз кейси

- HTTP proxy: req (Readable) → axios stream → res (Writable)
- Log aggregation: gzip decompress → filter → Postgres COPY
- Real-time CSV export з cursor-based DB query

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
