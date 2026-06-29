---
title: "Як переходити з однієї middleware в іншу?"
topic: nodejs
grade: junior
category: "Express.js"
order: 18
difficulty: easy
---

## Відповідь

Перехід — виклик `next()` без аргументів. Express передає управління наступній функції в ланцюжку. Якщо `next(err)` — стрибає до error-handling middleware (4 аргументи). Якщо `next()` не викликати і не відправити відповідь — запит «зависне». Порядок реєстрації `app.use()` визначає порядок виконання.

## Приклад

```js
app.use((req, res, next) => {
  console.log('1: auth check');
  if (!req.headers.authorization) return res.status(401).end();
  next(); // → наступна middleware
});

app.use((req, res, next) => {
  console.log('2: load user');
  req.user = { id: 1 };
  next(); // → route handler
});

app.get('/profile', (req, res) => res.json(req.user));
```

## Юз кейси

- Ланцюжок: parse body → auth → validation → handler
- Ранній вихід при 401 без виклику наступних middleware
- Router-level middleware через `router.use()`

## Документація

- [Express — Middleware](https://expressjs.com/en/guide/using-middleware.html)
