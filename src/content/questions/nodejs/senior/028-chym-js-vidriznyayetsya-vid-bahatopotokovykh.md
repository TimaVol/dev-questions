---
title: "Чим JS відрізняється від багатопотокових мов?"
topic: nodejs
grade: senior
category: "JavaScript"
order: 28
difficulty: hard
---

## Відповідь

JS (Node) — **однопотокова** модель виконання user code + кооперативна конкурентність через event loop. Паралелізм — `worker_threads`, `cluster`, дочірні процеси; немає спільної mutable пам'яті між потоками (виняток — SharedArrayBuffer з Atomics).

Java/C#/Go — OS threads, витісняюче планування, спільна пам'ять (locks, mutexes). Race conditions потребують явної синхронізації.

JS уникає data races у головному потоці, але має **async race conditions** (два await можуть переплітатися). CPU-паралелізм у Node — явний; I/O-конкурентність — неявна через non-blocking I/O.

## Приклад

```js
// Async race — not thread race
let balance = 100;
async function withdraw(amount) {
  const current = balance;
  await db.log(); // another request can interleave here
  balance = current - amount;
}

// True parallelism — worker
import { Worker } from 'node:worker_threads';
new Worker('./compute.js', { workerData: matrix });
```

## Юз кейси

- Пояснення, чому mutex не потрібен для синхронного лічильника в головному потоці
- Паралельний парсинг JSON через worker pool
- Порівняння моделі Node vs goroutines Go для IO-bound API

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
