---
title: "Чи можливо використовувати кілька потоків (threads)? За допомогою яких модулів це реалізовано?"
topic: nodejs
grade: junior
category: "Node.js"
order: 6
difficulty: hard
---

## Відповідь

Так. За замовчуванням JS-код виконується в одному головному потоці, але Node підтримує багатопотоковість через:

- **`worker_threads`** — окремі потоки з власним V8-контекстом для CPU-bound задач.
- **`cluster`** — кілька процесів (кожен зі своїм event loop) на різних ядрах CPU.
- **libuv thread pool** — внутрішньо для `fs`, `crypto`, `dns` (не для вашого JS напряму).

## Приклад

```js
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url), {
    workerData: { n: 40 },
  });
  worker.on('message', (result) => console.log('fib:', result));
} else {
  const fib = (n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2));
  parentPort.postMessage(fib(workerData.n));
}
```

## Юз кейси

- Паралельне стиснення/хешування великих файлів
- `cluster` для масштабування HTTP-сервера на всі ядра CPU
- Ізоляція важких обчислень, щоб не блокувати event loop

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
