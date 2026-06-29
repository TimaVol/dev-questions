---
title: "Чому Node.js не однопотоковий? Доведіть, що він ніколи не був однопотоковим?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 3
difficulty: hard
---

## Відповідь

Міф «Node однопотоковий» стосується лише **JavaScript execution thread** — один потік V8 виконує ваш JS-код. Але Node завжди мав багатопотоковість на рівні libuv: thread pool (default 4) для `fs.*`, crypto, DNS lookup; окремі OS threads для async I/O (epoll/kqueue/IOCP). З Node 10+ — `worker_threads` (окремі V8 isolates), з Node 12+ — `cluster` fork процесів. V8 сам має background threads (GC, compilation). Отже Node — **single-threaded event loop для JS**, але **multi-threaded runtime**.

## Приклад

```js
import os from 'node:os';
import { Worker, isMainThread } from 'node:worker_threads';

console.log('CPU cores:', os.cpus().length); // > 1
console.log('UV_THREADPOOL_SIZE default pool:', process.env.UV_THREADPOOL_SIZE ?? 4);

if (isMainThread) {
  new Worker(new URL(import.meta.url)); // другий V8 isolate
}
```

## Юз кейси

- Пояснення чому sync `fs.readFileSync` блокує лише JS, але I/O йде через pool
- Вибір між cluster, workers і окремими контейнерами
- Співбесідна пастка: «Node однопотоковий — чому?»

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
