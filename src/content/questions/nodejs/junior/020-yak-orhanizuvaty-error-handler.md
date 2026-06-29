---
title: "Як організувати error handler?"
topic: nodejs
grade: junior
category: "Express.js"
order: 20
difficulty: easy
---

## Відповідь

Error-handling middleware має **4 параметри**: `(err, req, res, next)`. Реєструється після усіх роутів. Async-помилки передають через `next(err)` або `throw` у `async` handler з обгорткою. Повертайте узгоджений JSON (`{ error, code }`), логуйте stack на сервері, клієнту — без внутрішніх деталей у prod. Для операційних помилок (404) — окремий handler.

## Приклад

```js
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await db.findById(req.params.id);
  if (!user) throw Object.assign(new Error('Not found'), { status: 404 });
  res.json(user);
}));

app.use((err, req, res, _next) => {
  const status = err.status || 500;
  console.error(err);
  res.status(status).json({ error: err.message });
});
```

## Юз кейси

- Централізована обробка помилок БД (unique constraint → 409)
- Інтеграція з Sentry: `Sentry.captureException(err)` у handler
- Розділення 4xx (клієнт) і 5xx (сервер) у логах і алертах

## Документація

- [Express — Error handling](https://expressjs.com/en/guide/error-handling.html)
