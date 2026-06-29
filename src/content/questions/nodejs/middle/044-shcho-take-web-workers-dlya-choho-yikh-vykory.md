---
title: "Що таке Web Workers? Для чого їх використовують?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 44
difficulty: easy
---

## Відповідь

**Web Workers** — browser API для паралельного JS у окремому потоці без блокування UI thread. Спілкування через `postMessage` / `onmessage` (structured clone, не shared memory за замовчуванням).

Аналог у Node.js backend — **`worker_threads`**, не Web Workers.

Web Workers релевантні для Node middle grade як comparison: BFF може proxy до browser, або SSR context. На сервері — worker_threads/cluster.

## Приклад

```js
// Node.js equivalent — worker_threads (не Web Workers)
import { Worker, isMainThread, workerData } from 'node:worker_threads';

if (isMainThread) {
  const worker = new Worker(new URL(import.meta.url), {
    workerData: { csvChunk: largeCsvString },
  });
  worker.on('message', (parsed) => console.log('rows:', parsed.length));
} else {
  const rows = workerData.csvChunk.split('\n').map((line) => line.split(','));
  parentPort.postMessage(rows);
}
```

## Юз кейси

- Browser: heavy parsing off main thread
- Node: worker_threads для CSV/JSON parse
- SharedArrayBuffer для high-perf shared state (обережно з security)

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
- [Web Workers — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
