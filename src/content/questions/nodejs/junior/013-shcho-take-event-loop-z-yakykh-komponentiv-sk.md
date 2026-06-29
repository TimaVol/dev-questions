---
title: "Що таке event loop? З яких компонентів складається і як працює?"
topic: nodejs
grade: junior
category: "Node.js"
order: 13
difficulty: easy
---

## Відповідь

Event loop — цикл libuv, який координує виконання JS-коду та async I/O. Фази (спрощено): **timers** (`setTimeout`/`setInterval`) → **pending callbacks** → **idle/prepare** → **poll** (I/O) → **check** (`setImmediate`) → **close callbacks**. Між фазами виконуються microtasks (`process.nextTick`, Promise). Sync-код завжди виконується повністю перед переходом до черг.

## Приклад

```js
import fs from 'node:fs';

console.log('start');
setTimeout(() => console.log('timer'), 0);
setImmediate(() => console.log('immediate'));
fs.readFile(__filename, () => {
  console.log('I/O callback');
  setImmediate(() => console.log('immediate in I/O'));
});
console.log('end');
```

## Юз кейси

- Пояснення, чому довгий sync-цикл «зависає» сервер
- Вибір `setImmediate` після I/O vs `setTimeout(0)`
- Діагностика затримок через `clinic.js` або `perf_hooks`

## Документація

- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
- [libuv — Design overview](http://docs.libuv.org/en/v1.0.0/design.html)
