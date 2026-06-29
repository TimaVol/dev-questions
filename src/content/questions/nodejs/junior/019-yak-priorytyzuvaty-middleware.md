---
title: "Як пріоритизувати middleware?"
topic: nodejs
grade: junior
category: "Express.js"
order: 19
difficulty: easy
---

## Відповідь

Пріоритет у Express = **порядок реєстрації**. Перша зареєстрована `app.use()` виконується першою. Загальне правило: спочатку глобальні (body parser, cors, logger), потім auth, потім route-specific middleware, в кінці — error handler з 4 параметрами. Для конкретного маршруту — middleware як аргументи: `app.get('/admin', requireAdmin, handler)`.

## Приклад

```js
app.use(express.json());        // 1. парсинг body
app.use(cors());                // 2. CORS
app.use(requestLogger);         // 3. логування

app.use('/api', apiRouter);     // 4. префікс — лише /api/*

app.use((err, req, res, next) => { // 5. error handler — останній
  res.status(500).json({ error: err.message });
});
```

## Юз кейси

- Body parser перед валідацією (потрібен `req.body`)
- Auth middleware перед захищеними роутами, не перед `/login`
- Error handler завжди після всіх `app.use` і роутів

## Документація

- [Express — Middleware](https://expressjs.com/en/guide/using-middleware.html)
