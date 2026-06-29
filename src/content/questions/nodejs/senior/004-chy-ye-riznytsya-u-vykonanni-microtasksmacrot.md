---
title: "Чи є різниця у виконанні microtasks/macrotasks залежно від версій Node.js?"
topic: nodejs
grade: senior
category: "Node.js"
order: 4
difficulty: hard
---

## Відповідь

Так. До Node 11 microtasks (Promise callbacks, `queueMicrotask`) виконувались після завершення поточної фази event loop, а не після кожного macrotask — порядок відрізнявся від браузера. З Node 11+ семантика вирівняна з HTML spec: після кожного macrotask (timer, I/O callback) drain усі pending microtasks.

Це впливає на race conditions у коді з `setTimeout(0)` + `Promise.then`, а також на бібліотеки, що покладаються на «browser-like» ordering. `process.nextTick` — окремий черга з вищим пріоритетом за Promise microtasks (Node-specific, може starve I/O).

При міграції між LTS версіями перевіряйте timing-sensitive код і тести з fake timers.

## Приклад

```js
setTimeout(() => console.log('macrotask'), 0);
Promise.resolve().then(() => console.log('microtask'));
process.nextTick(() => console.log('nextTick'));
// Node 11+: nextTick → microtask → macrotask
```

## Юз кейси

- Дебаг «flaky» тестів після апгрейду Node LTS
- Реалізація debounce/throttle з Promise + setTimeout
- Розуміння, чому `nextTick` може блокувати I/O при рекурсії

## Документація

- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
