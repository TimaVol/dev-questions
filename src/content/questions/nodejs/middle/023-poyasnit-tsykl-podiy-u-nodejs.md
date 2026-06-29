---
title: "Поясніть цикл подій у Node.js."
topic: nodejs
grade: middle
category: "Node.js"
order: 23
difficulty: medium
---

## Відповідь

Event loop — механізм, який дозволяє одному потоку виконувати JS і обробляти async I/O. Керується libuv.

Фази (спрощено):
- **Timers** — `setTimeout`, `setInterval`
- **Pending callbacks** — deferred I/O callbacks
- **Poll** — нові I/O events, блокує до timeout
- **Check** — `setImmediate`
- **Close** — `socket.on('close')`

Між фазами: **microtasks** (Promises, `queueMicrotask`) і **`process.nextTick`** (найвищий пріоритет).

Sync код → microtasks → macrotasks (timers, I/O).

## Приклад

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
process.nextTick(() => console.log('4'));
console.log('5');
// 1, 5, 4, 3, 2
```

## Юз кейси

- Розуміння порядку async middleware у Express
- Чому `nextTick` може starve I/O
- Debugging «чому callback не викликався»

## Документація

- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
