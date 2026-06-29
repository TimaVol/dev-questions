---
title: "У чому полягає проблема товстих контролерів?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 34
difficulty: medium
---

## Відповідь

Fat controller — route handler містить validation, бізнес-логіку, DB queries, зовнішні API calls, mapping, обробку помилок. Проблеми: **не тестується** без HTTP mock; **дублювання логіки** між routes; **порушення SRP** — зміни в domain ламають HTTP layer; важко reuse; високе зв'язування з Express req/res. Рішення: thin controllers (parse input → call service → map response), service/use-case layer, repository для БД, DTO mappers, validation middleware (zod/joi).

## Приклад

```js
// Fat — все в handler
app.post('/orders', async (req, res) => {
  if (!req.body.items?.length) return res.status(400).json({ err: 'items' });
  const total = req.body.items.reduce((s, i) => s + i.price * i.qty, 0);
  const user = await db.query('SELECT * FROM users WHERE id=$1', [req.user.id]);
  if (user.credit < total) return res.status(402).json({ err: 'funds' });
  // ... 50 more lines
});

// Thin
app.post('/orders', async (req, res, next) => {
  try {
    const order = await orderService.create(req.user.id, req.body);
    res.status(201).json(order);
  } catch (e) { next(e); }
});
```

## Юз кейси

- Рефакторинг legacy Express monolith
- Модулі NestJS (розділення controller vs service)
- Unit test бізнес-правил без supertest

## Документація

- [Express — Routing](https://expressjs.com/en/guide/routing.html)
- [Express — Middleware](https://expressjs.com/en/guide/using-middleware.html)
