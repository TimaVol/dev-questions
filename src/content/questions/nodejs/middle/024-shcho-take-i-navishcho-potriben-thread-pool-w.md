---
title: "Що таке і навіщо потрібен Thread Pool (Worker Pool)?"
topic: nodejs
grade: middle
category: "Node.js"
order: 24
difficulty: medium
---

## Відповідь

**Thread pool** (libuv worker pool) — фіксована кількість OS-потоків (default 4), які виконують операції, для яких немає efficient async OS API: `fs.readFile`, `crypto.pbkdf2`, `dns.lookup`, `zlib`.

JS-потік не блокується — задача делегується в pool, callback повертається в event loop після завершення.

`UV_THREADPOOL_SIZE=128` — для crypto-heavy API. Занадто великий pool → context switching overhead.

Відрізняється від `worker_threads`: pool — internal libuv; worker_threads — ваш JS-код у окремих потоках.

## Приклад

```js
import { pbkdf2 } from 'node:crypto';

// Виконується в libuv thread pool, не блокує event loop
pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, key) => {
  console.log('hash done');
});

console.log('request accepted'); // одразу
```

## Юз кейси

- bcrypt 12 rounds на login — pool + rate limit
- Batch file encryption
- Tuning pool size під load test results

## Документація

- [Don't block the event loop — Node.js](https://nodejs.org/en/docs/guides/dont-block-the-event-loop)
