---
title: "Яка різниця між microtasks і macrotasks? Наведіть приклади таких завдань."
topic: nodejs
grade: junior
category: "Node.js"
order: 10
difficulty: easy
---

## Відповідь

**Microtasks** — дрібні задачі після поточного sync-коду, до наступного macrotask. Приклади: `Promise.then/catch/finally`, `queueMicrotask()`, `process.nextTick` (в Node — ще вищий пріоритет).

**Macrotasks** — задачі event loop. Приклади: `setTimeout`, `setInterval`, I/O callbacks, `setImmediate` (Node).

Порядок: sync код → усі microtasks → один macrotask → знову microtasks.

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

- Дебаг «чому then виконався раніше setTimeout»
- Уникнення starvation: нескінченні microtasks блокують I/O
- Планування: `setImmediate` vs `setTimeout(0)` у Node для defer після I/O

## Документація

- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
