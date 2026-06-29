---
title: "Що таке backpressure у контексті стримів? Як з цим боротись?"
topic: nodejs
grade: middle
category: "Node.js"
order: 26
difficulty: medium
---

## Відповідь

**Backpressure** — ситуація, коли producer (readable) генерує дані швидше, ніж consumer (writable) їх обробляє. Без контролю — memory buffer росте до OOM.

У Node.js streams: `writable.write()` повертає `false` → потрібно pause readable до події `drain`. `pipe()` і `pipeline()` роблять це автоматично.

Симптоми: RSS зростає при file upload/download, slow client блокує server memory.

## Приклад

```js
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

// pipeline автоматично керує backpressure
await pipeline(
  createReadStream('large-dump.sql'),
  createGzip(),
  createWriteStream('dump.sql.gz'),
);
```

## Юз кейси

- Proxy великого файлу client → S3 без buffering
- Slow DB insert з fast CSV parser — pause/resume
- HTTP response streaming з rate limiting

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
- [Backpressuring — Node.js](https://nodejs.org/en/docs/guides/backpressuring-in-streams)
