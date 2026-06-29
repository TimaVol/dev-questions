---
title: "Які особливості передачі даними між worker'ами та основним потоком?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 45
difficulty: medium
---

## Відповідь

У **Node.js worker_threads** обмін даними відбувається так:
- **`postMessage(data)`** — алгоритм structured clone створює копію, не посилання
- **`transferList`** — передача ArrayBuffer без копіювання (zero-copy)
- **`SharedArrayBuffer`** — спільна пам'ять, потрібна синхронізація через Atomics
- **`workerData`** — початкові дані при створенні worker
- Великі об'єкти — накладні витрати на клонування; краще передати buffer або шлях до файлу

У **Web Workers (браузер)** — аналогічний механізм postMessage і structured clone, але без прямого доступу до DOM.

## Приклад

```js
import { Worker } from 'node:worker_threads';

const buffer = new ArrayBuffer(1024 * 1024);
const worker = new Worker('./process.js');

// Zero-copy transfer — main втрачає access до buffer
worker.postMessage({ buffer }, [buffer]);

// worker.js
import { parentPort, workerData } from 'node:worker_threads';
parentPort.on('message', ({ buffer }) => {
  const view = new Uint8Array(buffer);
  // process...
  parentPort.postMessage({ done: true });
});
```

## Юз кейси

- Передача буфера зображення в worker для зміни розміру
- Уникнення клонування JSON на 50 МБ — запис у тимчасовий файл, передача шляху
- MessagePack для компактних міжпотокових повідомлень

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
- [Buffer — Node.js](https://nodejs.org/api/buffer.html)
