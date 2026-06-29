---
title: "Які ви знаєте проблеми, баги та вузькі місця у Node.js?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 1
difficulty: hard
---

## Відповідь

Основні вузькі місця: один потік JS — CPU-bound задачі блокують event loop; sync fs/crypto — starve I/O; memory leaks через closures, EventEmitter без `removeListener`, необмежені кеші. Типові баги: необроблені `unhandledRejection`, race conditions при async I/O, TOCTOU з файлами, витік контексту між запитами без AsyncLocalStorage. Обмеження: немає ізоляції процесів між модулями (на відміну від worker), GC паузи на великих heap, libuv thread pool (4 потоки за замовч.) — bottleneck для sync fs.

## Приклад

```js
// CPU-bound блокує event loop
function hashAll(rows) {
  for (const row of rows) bcrypt.hashSync(row, 12); // погано
}

// Краще: worker_threads або черга
import { Worker } from 'node:worker_threads';
new Worker(new URL('./hash-worker.js', import.meta.url), { workerData: rows });
```

## Юз кейси

- Діагностика latency spikes у production API
- Профілювання event loop lag (`perf_hooks`, clinic.js)
- Архітектурні рішення: workers vs cluster vs окремі сервіси

## Документація

- [Don't block the event loop — Node.js](https://nodejs.org/en/docs/guides/dont-block-the-event-loop)
- [Memory diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics/memory)
