---
title: "Як оновити значення колонки в таблиці?"
topic: nodejs
grade: junior
category: "Бази даних"
order: 44
difficulty: easy
---

## Відповідь

SQL-команда `UPDATE table SET column = value WHERE condition`. Завжди додавайте `WHERE`, інакше оновите всі рядки. Використовуйте **параметризовані запити** (`$1`, `?`) — ніколи не конкатенуйте user input (SQL injection). Повернути оновлений рядок: `RETURNING *` (PostgreSQL).

## Приклад

```sql
UPDATE users
SET name = $1, updated_at = NOW()
WHERE id = $2
RETURNING id, name, updated_at;
```

```js
const { rows } = await pool.query(
  'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
  ['New Name', userId]
);
```

## Юз кейси

- PATCH `/users/:id` — оновлення одного поля
- Soft delete: `UPDATE users SET deleted_at = NOW() WHERE id = $1`
- Batch update статусу замовлень за списком ID

## Документація

- [PostgreSQL — UPDATE](https://www.postgresql.org/docs/current/sql-update.html)
