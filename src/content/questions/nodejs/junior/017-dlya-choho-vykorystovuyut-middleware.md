---
title: "Для чого використовують middleware?"
topic: nodejs
grade: junior
category: "Express.js"
order: 17
difficulty: medium
---

## Відповідь

Middleware — функції з сигнатурою `(req, res, next)`, які виконуються між отриманням HTTP-запиту і фінальним route handler. Вони розділяють cross-cutting логіку: парсинг body, автентифікація, логування, CORS, rate limiting. Кожен middleware або викликає `next()`, або завершує відповідь (`res.send`, `res.status`).

## Приклад

```js
import express from 'express';
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});
app.get('/users', (req, res) => res.json({ id: req.requestId }));
```

## Юз кейси

- JWT-перевірка перед захищеними маршрутами
- Централізований request logging з timing
- `helmet()` для security headers на всіх маршрутах

## Документація

- [Express — Middleware](https://expressjs.com/en/guide/using-middleware.html)
