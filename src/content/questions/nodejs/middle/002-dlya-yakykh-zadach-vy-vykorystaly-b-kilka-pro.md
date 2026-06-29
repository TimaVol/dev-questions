---
title: "Для яких задач ви використали б кілька процесів/потоків (processes/threads)?"
topic: nodejs
grade: middle
category: "Node.js"
order: 2
difficulty: medium
---

## Відповідь

Node.js за замовчуванням — один потік на процес. Кілька процесів/потоків потрібні, коли:

- **CPU-bound робота** — парсинг PDF, генерація звітів, стиснення зображень (`worker_threads`)
- **Використання всіх ядер** — `cluster` або PM2 fork для HTTP-сервера
- **Ізоляція** — sandbox для user code, окремий процес для cron-задач
- **Crash isolation** — падіння воркера не валить увесь сервер

Async I/O (запити до БД, HTTP-клієнт) не потребує додаткових потоків — event loop це вже обробляє.

## Приклад

```js
import { Worker } from 'node:worker_threads';

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./hash-worker.js', { workerData: password });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}
```

## Юз кейси

- Генерація CSV/Excel звітів у фоні
- Масове resize зображень при upload
- Cluster mode для production API на багатоядерному сервері

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
