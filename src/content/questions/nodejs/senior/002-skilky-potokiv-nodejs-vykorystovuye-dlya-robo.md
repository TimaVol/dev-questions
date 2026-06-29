---
title: "Скільки потоків Node.js використовує для роботи? Яким чином можна регулювати цю кількість?"
topic: nodejs
grade: senior
category: "Node.js"
order: 2
difficulty: medium
---

## Відповідь

Мінімум: один main thread (V8 + event loop) плюс libuv thread pool — за замовчуванням 4 потоки для blocking операцій (fs, dns, crypto, compression). Додатково libuv створює internal threads для async I/O backend (epoll/kqueue/IOCP).

`UV_THREADPOOL_SIZE` (до 1024) регулює розмір libuv pool — збільшуйте, якщо багато паралельних `fs`/`crypto`/`zlib` викликів. `cluster` або PM2 fork дає N процесів × cores для HTTP. `worker_threads` — окремі V8 isolates для CPU-bound без fork цілого процесу.

Важливо розрізняти: більше потоків у pool ≠ більше паралельного JS; JS-код у процесі все одно виконується в одному main thread.

## Приклад

```bash
# Збільшити libuv pool перед стартом
UV_THREADPOOL_SIZE=16 node server.js
```

```js
import cluster from 'node:cluster';
import os from 'node:os';

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) cluster.fork();
} else {
  startHttpServer();
}
```

## Юз кейси

- Тюнінг сервісу з інтенсивним bcrypt/scrypt hashing
- Горизонтальне масштабування API на multi-core bare metal
- Діагностика «чому 4 fs-операції виконуються послідовно»

## Документація

- [UV_THREADPOOL_SIZE — libuv](http://docs.libuv.org/en/v1.0.0/threadpool.html)
- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
