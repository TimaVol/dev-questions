---
title: "Як індекс бази даних може підвищити продуктивність?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 82
difficulty: medium
---

## Відповідь

**Індекс** — допоміжна структура даних (зазвичай B-tree) для швидкого пошуку без повного сканування таблиці.

Без індексу: `WHERE email = 'x'` → послідовне сканування O(n).
З індексом на email: пошук у індексі O(log n) → прямий доступ до рядка.

Особливо критично для:
- Колонок у WHERE, JOIN, ORDER BY
- Зовнішніх ключів (часто індексуються автоматично)
- Таблиць з високим читанням (users, products)

Компроміс: індекси прискорюють читання, сповільнюють запис (INSERT/UPDATE мають оновлювати індекс).

## Приклад

```sql
-- Slow without index on orders.user_id
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 'abc-123';

-- Add index
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Composite index for common query pattern
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);
```

## Юз кейси

- Індекс на колонці email для пошуку при логіні
- Композитний (status, created_at) для фільтра в адмін-дашборді
- EXPLAIN ANALYZE до/після індексу на staging

## Документація

- [PostgreSQL — Indexes](https://www.postgresql.org/docs/current/indexes.html)
