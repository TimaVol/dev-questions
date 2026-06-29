---
title: "Поясніть, що таке Garbage Collector."
topic: nodejs
grade: middle
category: "Node.js"
order: 11
difficulty: medium
---

## Відповідь

**Garbage Collector (GC)** у V8 автоматично звільняє пам'ять від об'єктів, до яких немає reachable посилань. V8 використовує generational GC: молоде покоління (Scavenge) для короткоживучих об'єктів і старе (Mark-Sweep/Mark-Compact) для довгоживучих.

GC запускається, коли heap наближається до ліміту або явно через `--expose-gc`. **Витік пам'яті** — не збій GC, а ситуація, коли код тримає посилання на об'єкти, які більше не потрібні (глобальні Map без TTL, забуті listeners).

## Приклад

```js
// Витік: listener ніколи не знімається
function attach(userId) {
  const handler = () => console.log(userId);
  eventBus.on('tick', handler); // без .off() — handler живе вічно
}

// Краще: WeakMap або явне зняття
const handlers = new WeakMap();
function attach(user) {
  const handler = () => console.log(user.id);
  handlers.set(user, handler);
  eventBus.on('tick', handler);
}
function detach(user) {
  eventBus.off('tick', handlers.get(user));
}
```

## Юз кейси

- Heap snapshot у `--inspect` для пошуку retained objects
- Моніторинг `process.memoryUsage().heapUsed` у production
- Уникнення глобальних кешів без eviction policy

## Документація

- [V8 — Garbage collection](https://v8.dev/blog/trash-talk)
