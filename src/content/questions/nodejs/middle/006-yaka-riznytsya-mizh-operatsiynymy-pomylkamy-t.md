---
title: "Яка різниця між операційними помилками та помилками програміста?"
topic: nodejs
grade: middle
category: "Node.js"
order: 6
difficulty: medium
---

## Відповідь

**Operational errors** — очікувані збої середовища: БД недоступна, timeout зовнішнього API, диск переповнений, невалідний JSON у body. Код працює правильно, але операція не вдалась. Обробляються retry, fallback, 503.

**Programmer errors** — баги: `undefined.property`, виклик callback двічі, race condition у shared state. Це помилка розробника; retry не допоможе — потрібен fix і restart.

У Node.js operational → `next(err)` / catch з відповідним HTTP-кодом; programmer → лог + alert + crash (process manager перезапустить).

## Приклад

```js
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await db.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' }); // operational
    res.json(user);
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: 'DB unavailable' }); // operational
    }
    next(err); // programmer error — 500 + log
  }
});
```

## Юз кейси

- Retry з exponential backoff для transient DB errors
- Circuit breaker для зовнішніх сервісів
- Sentry/alert на uncaughtException (programmer bugs)

## Документація

- [Errors — Node.js](https://nodejs.org/api/errors.html)
- [Express — Error handling](https://expressjs.com/en/guide/error-handling.html)
