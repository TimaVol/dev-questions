---
title: "Чи можливо програмно контролювати виділення і звільнення пам'яті в Node.js програмі?"
topic: nodejs
grade: middle
category: "Node.js"
order: 10
difficulty: medium
---

## Відповідь

Прямого `malloc/free` у Node.js немає — пам'яттю керує V8 Garbage Collector. Але можна впливати опосередковано:

- **`global.gc()`** — примусовий GC, лише з `--expose-gc`
- **`Buffer.alloc()` vs `Buffer.allocUnsafe()`** — контроль ініціалізації
- **`WeakMap` / `WeakRef`** — не утримують об'єкти від GC
- **Звільнення ресурсів** — `stream.destroy()`, закриття DB connections, `clearInterval`
- **`process.memoryUsage()`** — моніторинг heap

Ручне «виділення/звільнення» як у C — ні; профілювання і усунення витоків — так.

## Приклад

```js
// Погано: глобальний кеш без TTL — витік пам'яті
const cache = new Map();
app.get('/users/:id', async (req, res) => {
  if (!cache.has(req.params.id)) {
    cache.set(req.params.id, await db.findById(req.params.id));
  }
  res.json(cache.get(req.params.id));
});

// Краще: LRU з обмеженням розміру
import LRU from 'lru-cache';
const cache = new LRU({ max: 500, ttl: 60_000 });
```

## Юз кейси

- Heap snapshot у Chrome DevTools для пошуку leak
- `--max-old-space-size` для обмеження heap у контейнері
- WeakMap для metadata без блокування GC entity

## Документація

- [Memory diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics/memory)
- [V8 — Garbage collection](https://v8.dev/blog/trash-talk)
