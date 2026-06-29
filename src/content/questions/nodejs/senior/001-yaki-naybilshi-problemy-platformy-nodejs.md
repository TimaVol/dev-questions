---
title: "Які найбільші проблеми платформи Node.js?"
topic: nodejs
grade: senior
category: "Node.js"
order: 1
difficulty: hard
---

## Відповідь

Node.js оптимізований під I/O-bound навантаження на одному потоці event loop. CPU-intensive задачі (JSON parsing великих payload, image processing, crypto без thread pool) блокують loop і підвищують latency для всіх запитів — це головний архітектурний trade-off.

Другий клас проблем — операційний: memory leaks у long-running процесах (незакриті listeners, глобальні кеші без TTL, closures над великими об'єктами), нестабільність через transitive npm-залежності та semver-breaking у ecosystem. Без TypeScript помилки типів вилітають у production.

На рівні distributed systems Node не дає «безкоштовного» масштабування: один процес = один core для JS-коду; потрібні cluster/worker threads, stateless design, externalized session/store. Error handling у async-ланцюжках без unhandledRejection handler може «тихо» втрачати помилки.

## Приклад

```js
// CPU-bound у main thread — антипатерн
function hashAll(rows) {
  return rows.map((r) => expensiveHash(r)); // блокує event loop
}

// Рішення: worker_threads або винести в окремий сервіс
import { Worker } from 'node:worker_threads';
const worker = new Worker('./hash-worker.js', { workerData: rows });
```

## Юз кейси

- Аудит production API з p99 latency spikes під навантаженням
- Вибір між Node-сервісом і окремим worker для batch-обробки
- Code review: виявлення blocking sync I/O (`fs.readFileSync`) у hot path

## Документація

- [Don't block the event loop — Node.js](https://nodejs.org/en/docs/guides/dont-block-the-event-loop)
- [Diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics)
