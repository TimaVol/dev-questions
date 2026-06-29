---
title: "Що таке замикання/closure?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 40
difficulty: easy
---

## Відповідь

**Closure** — функція «запам'ятовує» lexical scope, де була створена, навіть після виходу з outer function. Inner function має доступ до змінних outer function.

У Node.js backend:
- Factory functions для middleware з config
- Module pattern (private state через closure)
- **Ризик memory leak** — closure тримає великі об'єкти

## Приклад

```js
function createRateLimiter(maxRequests, windowMs) {
  const hits = new Map(); // private state через closure

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const entry = hits.get(key) ?? { count: 0, resetAt: now + windowMs };

    if (now > entry.resetAt) {
      entry.count = 0;
      entry.resetAt = now + windowMs;
    }
    entry.count++;
    hits.set(key, entry);

    if (entry.count > maxRequests) return res.status(429).end();
    next();
  };
}

app.use(createRateLimiter(100, 60_000));
```

## Юз кейси

- DI-lite: factory з db connection
- Partial application для route handlers
- Увага: не захоплювати req/res у setInterval без cleanup

## Документація

- [Closures — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
