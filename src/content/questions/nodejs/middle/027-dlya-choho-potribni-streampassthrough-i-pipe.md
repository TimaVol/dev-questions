---
title: "Для чого потрібні stream.PassThrough і pipe (pipeline)? Наведіть приклади використання."
topic: nodejs
grade: middle
category: "Node.js"
order: 27
difficulty: medium
---

## Відповідь

**`pipe` / `pipeline`** — з'єднують readable → transform → writable з автоматичним backpressure і error handling. `pipeline()` (promises) краще за `.pipe()` — propagates errors і cleanup.

**`PassThrough`** — duplex stream без transform; використовується як:
- Tap/monitor (log bytes проходять)
- Multiplex (split stream на два consumers)
- Placeholder у composable pipeline

## Приклад

```js
import { PassThrough, pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

const pipelineAsync = promisify(pipeline);

const monitor = new PassThrough();
let bytes = 0;
monitor.on('data', (chunk) => { bytes += chunk.length; });

await pipelineAsync(
  createReadStream('upload.csv'),
  monitor,
  createGzip(),
  createWriteStream('upload.csv.gz'),
);
console.log(`Transferred ${bytes} bytes`);
```

## Юз кейси

- Upload progress bar через PassThrough counter
- Multi-destination: tee stream to S3 + local backup
- Error-safe ETL chains з pipeline()

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
- [stream.pipeline — Node.js](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-callback)
