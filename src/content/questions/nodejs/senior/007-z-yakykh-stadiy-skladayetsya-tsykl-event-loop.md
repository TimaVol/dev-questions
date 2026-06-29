---
title: "З яких стадій складається цикл event loop в libuv?"
topic: nodejs
grade: senior
category: "Node.js"
order: 7
difficulty: hard
---

## Відповідь

libuv event loop має 6 фаз (кожен tick): **timers** — `setTimeout`/`setInterval` callbacks; **pending callbacks** — I/O callbacks deferred з попередньої ітерації; **idle, prepare** — internal; **poll** — отримання нових I/O events, блокується до timeout або готових handles; **check** — `setImmediate` callbacks; **close callbacks** — `close` event на handles.

Між фазами виконується `process.nextTick` queue, потім microtasks (Promises). `setImmediate` vs `setTimeout(0)` — різні фази: у poll phase `setImmediate` часто раніше.

Розуміння фаз критичне для діагностики starvation: довгий sync код або нескінченний nextTick блокує poll і таймери.

## Приклад

```js
import fs from 'node:fs';

setTimeout(() => console.log('timers'), 0);
setImmediate(() => console.log('check'));
fs.readFile(__filename, () => {
  setTimeout(() => console.log('timers in I/O'), 0);
  setImmediate(() => console.log('immediate in I/O'));
});
// Після I/O callback: immediate in I/O → timers in I/O
```

## Юз кейси

- Профілювання latency spikes через blocked poll phase
- Вибір setImmediate vs process.nextTick для defer
- Розбір classic interview/async ordering задач

## Документація

- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
- [libuv — Design](http://docs.libuv.org/en/v1.0.0/design.html)
