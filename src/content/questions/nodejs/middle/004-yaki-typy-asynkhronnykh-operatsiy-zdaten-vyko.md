---
title: "Які типи асинхронних операцій здатен виконувати Node.js?"
topic: nodejs
grade: middle
category: "Node.js"
order: 4
difficulty: medium
---

## Відповідь

Node.js делегує асинхронні операції libuv, який використовує різні механізми:

- **Timers** — `setTimeout`, `setInterval`, `setImmediate`
- **I/O (poll phase)** — файли, мережа (TCP/UDP), DNS через thread pool
- **Microtasks** — Promise callbacks, `queueMicrotask`, `process.nextTick`
- **Child processes / Workers** — `child_process`, `worker_threads`
- **Signals** — SIGTERM, SIGINT для graceful shutdown

Синхронний CPU-код виконується безпосередньо в event loop і блокує все інше.

## Приклад

```js
import fs from 'node:fs/promises';
import dns from 'node:dns/promises';

// File I/O — async через libuv thread pool
const data = await fs.readFile('config.json', 'utf8');

// Network DNS lookup — async
const { address } = await dns.lookup('api.example.com');

// Timer — macrotask
setTimeout(() => console.log('later'), 100);
```

## Юз кейси

- Читання конфігурації при старті сервера
- Паралельні запити до зовнішніх API
- Graceful shutdown по SIGTERM у Kubernetes

## Документація

- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
- [Blocking vs non-blocking — Node.js](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking)
