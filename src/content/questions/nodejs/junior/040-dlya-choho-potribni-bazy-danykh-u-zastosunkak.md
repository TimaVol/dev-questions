---
title: "Для чого потрібні бази даних у застосунках?"
topic: nodejs
grade: junior
category: "Бази даних"
order: 40
difficulty: easy
---

## Відповідь

БД зберігають дані **персистентно** (після перезапуску сервера), дозволяють **структуровані запити** (фільтр, сортування, join), **транзакції** (ACID) і **конкурентний доступ** багатьох клієнтів. У Node.js типово PostgreSQL (relational), MongoDB (документи), Redis (кеш/черги). In-memory об'єкти не замінюють БД у продакшені.

## Приклад

```js
import pg from 'pg';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get('/users', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, name FROM users WHERE active = true LIMIT $1',
    [10]
  );
  res.json(rows);
});
```

## Юз кейси

- Зберігання користувачів, замовлень, сесій
- Аналітика та звіти через SQL
- Redis для rate limit і session store поруч із PostgreSQL

## Документація

- [PostgreSQL — Introduction](https://www.postgresql.org/docs/current/tutorial.html)
