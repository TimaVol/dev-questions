---
title: "Що таке middleware? Якщо ми пишемо свій middleware, чому саме там, чому не в коді сервісу?"
topic: nodejs
grade: middle
category: "Node.js"
order: 19
difficulty: medium
---

## Відповідь

**Middleware** — функції `(req, res, next)` між HTTP-запитом і route handler. Виконуються послідовно для кожного запиту: parsing body, auth, CORS, logging. `next(err)` передає помилку в error middleware (4 аргументи).

Логіку виносять у middleware, коли вона **cross-cutting** — потрібна багатьом routes (auth, requestId, rate limit). У сервісі залишають бізнес-логіку одного use case. Middleware = DRY + separation of concerns.

## Приклад

```js
// Cross-cutting: auth для всіх /api/* routes
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  req.user = verifyJwt(token);
  next();
}

app.use('/api', requireAuth);
app.get('/api/orders', (req, res) => {
  // req.user вже є — бізнес-логіка без дублювання auth
  return orderService.listForUser(req.user.id);
});
```

## Юз кейси

- JWT verification перед protected routes
- Structured request logging з duration
- Centralized error handler → JSON 500 + Sentry

## Документація

- [Express — Middleware](https://expressjs.com/en/guide/using-middleware.html)
