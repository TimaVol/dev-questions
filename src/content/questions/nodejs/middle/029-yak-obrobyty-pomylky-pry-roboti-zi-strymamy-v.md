---
title: "Як обробити помилки при роботі зі стримами в Node.js?"
topic: nodejs
grade: middle
category: "Node.js"
order: 29
difficulty: medium
---

## Відповідь

Правила error handling для streams:

- **Завжди** `.on('error', handler)` на кожному stream у chain
- **`pipeline()`** — автоматично destroy streams і propagate error
- При `.pipe()` без pipeline — error на downstream не зупиняє upstream (leak!)
- **`try/catch`** не ловить async stream errors — тільки events
- Cleanup: `stream.destroy(err)` для release resources

У HTTP: stream error → abort response, delete temp files.

## Приклад

```js
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

app.post('/upload', (req, res) => {
  const dest = `/tmp/${Date.now()}.bin`;
  const ws = createWriteStream(dest);

  pipeline(req, ws)
    .then(() => res.status(201).json({ path: dest }))
    .catch((err) => {
      fs.unlink(dest, () => {});
      res.status(500).json({ error: err.message });
    });
});
```

## Юз кейси

- S3 multipart upload з rollback on error
- CSV import: skip bad rows vs fail entire batch
- Client disconnect mid-upload → destroy stream

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
- [Errors — Node.js](https://nodejs.org/api/errors.html)
