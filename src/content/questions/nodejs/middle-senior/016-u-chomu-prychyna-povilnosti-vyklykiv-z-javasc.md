---
title: "У чому причина повільності викликів з JavaScript коду до аддонів на C, C++ чи під'єднаних через N-API?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 16
difficulty: hard
---

## Відповідь

Overhead на кожен перехід JS↔native: marshalling типів (V8 Handle ↔ C struct), перевірка типів, поширення винятків. Часті **маленькі виклики** гірші за один batch — N-API не inline-иться V8. `Buffer`/`TypedArray` zero-copy краще за конвертацію в string. Sync native call **блокує event loop** — навіть «швидкий» C++ stall усі I/O. Async N-API (`napi_async_work`) делегує в libuv pool. V8 GC може pin/unpin objects при crossing. Оптимізація: batch operations, тримати дані в Buffer, thread-safe N-API для workers.

## Приклад

```js
// Погано: N викликів native на кожен byte
for (const b of buffer) addon.processByte(b);

// Краще: один виклик з pointer + length
addon.processBuffer(buffer.buffer, buffer.byteOffset, buffer.length);

// Async native — не блокує loop
addon.processAsync(buffer, (err, result) => { /* callback */ });
```

## Юз кейси

- Crypto/hash/image processing addons
- Профілювання hot paths у `sharp`, `bcrypt`, `sqlite3`
- Рішення sync vs async у дизайні addon API

## Документація

- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
- [N-API — Node.js](https://nodejs.org/api/n-api.html)
