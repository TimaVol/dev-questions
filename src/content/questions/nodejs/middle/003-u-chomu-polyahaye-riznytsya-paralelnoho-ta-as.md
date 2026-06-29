---
title: "У чому полягає різниця паралельного та асинхронного програмування на прикладі серверних застосунків?"
topic: nodejs
grade: middle
category: "Node.js"
order: 3
difficulty: medium
---

## Відповідь

**Асинхронність** — не чекати завершення операції, а продовжувати іншу роботу. У Node.js один потік обробляє запит A, поки чекає відповідь від БД для запиту B. Це concurrency без паралелізму.

**Паралелізм** — одночасне виконання на кількох ядрах/потоках. Два CPU-bound обчислення справді йдуть паралельно через `worker_threads` або `cluster`.

На сервері: async I/O (типовий REST API) — асинхронність; batch-обробка відео на 8 ядрах — паралелізм. Часто поєднують обидва підходи.

## Приклад

```js
// Асинхронно: один потік, два запити «одночасно»
const [users, orders] = await Promise.all([
  db.query('SELECT * FROM users'),
  db.query('SELECT * FROM orders'),
]);

// Паралельно: кожен воркер — окремий потік
import { Worker } from 'node:worker_threads';
const workers = Array.from({ length: 4 }, () => new Worker('./process-chunk.js'));
```

## Юз кейси

- Async: API з десятками одночасних HTTP-запитів
- Parallel: nightly ETL job на всіх ядрах сервера
- Hybrid: async fetch + parallel transform через worker pool

## Документація

- [async/await — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
