---
title: "Як захистити SharedArrayBuffer від запису з різних worker_threads?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 12
difficulty: hard
---

## Відповідь

SharedArrayBuffer (SAB) — спільна пам'ять між threads без копіювання; **немає автоматичного захисту** від concurrent write — потрібна координація через `Atomics`. `Atomics.store/load/add/sub/compareExchange/wait/notify` — atomic ops + futex-style blocking. Mutex pattern: compareExchange на lock byte, wait на contention. У Node (на відміну від browser) немає COOP/COEP обмежень — SAB доступний у worker_threads. Альтернатива — message passing без shared state (простіше, без data races).

## Приклад

```js
import { Worker, isMainThread, workerData } from 'node:worker_threads';

if (isMainThread) {
  const sab = new SharedArrayBuffer(4);
  const view = new Int32Array(sab);
  new Worker(new URL(import.meta.url), { workerData: { sab } });
  Atomics.store(view, 0, 42);
  Atomics.notify(view, 0);
} else {
  const view = new Int32Array(workerData.sab);
  Atomics.wait(view, 0, 0); // чекає, поки main запише
  console.log(Atomics.load(view, 0)); // 42
}
```

## Юз кейси

- Lock-free counters / rate limiters між workers
- Ring buffer для high-throughput log aggregation
- Shared state у native addon + JS workers

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
- [Buffer — Node.js](https://nodejs.org/api/buffer.html)
