---
title: "Які обмеження накладаються на потік Web Workers?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 46
difficulty: medium
---

## Відповідь

**Web Workers (браузер)** — обмеження:
- Немає доступу до DOM, `window`, `document`
- Немає прямого доступу до змінних батьківської сторінки
- Комунікація лише через `postMessage`
- Обмежений набір Web API (fetch, IndexedDB — так; localStorage same-origin — ні в dedicated worker)
- Застосовуються CORS і CSP

**Node.js worker_threads** — інші обмеження:
- Окремий V8 isolate — за замовчуванням не спільний require cache
- Немає спільних мутацій `process.env`
- Накладні витрати на старт — не для тривіальних задач

## Приклад

```js
// worker_threads — не можна просто import shared singleton DB pool
// Кожен worker має свій connection pool або отримує tasks через messages

import { Worker } from 'node:worker_threads';

const pool = [];
for (let i = 0; i < 4; i++) {
  pool.push(new Worker('./db-worker.js')); // окремий pool per worker
}

function runQuery(sql, params) {
  const worker = pool[Math.floor(Math.random() * pool.length)];
  return new Promise((resolve, reject) => {
    worker.once('message', resolve);
    worker.once('error', reject);
    worker.postMessage({ sql, params });
  });
}
```

## Юз кейси

- Розмір пулу worker = кількість ядер CPU для CPU-задач
- Окремий worker для довготривалого споживача
- Браузерний worker для генерації PDF на клієнті

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
- [Web Workers — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
