---
title: "За допомогою чого можна відфільтрувати таблицю Users за параметром віку?"
topic: nodejs
grade: junior
category: "Бази даних"
order: 45
difficulty: easy
---

## Відповідь

Клауза **`WHERE`** у `SELECT` фільтрує рядки за умовою. Для віку: `WHERE age >= 18`, `WHERE age BETWEEN 18 AND 65`. Параметризуйте: `WHERE age > $1`. Оператори: `=`, `>`, `<`, `>=`, `<=`, `<>`, `IN`, `IS NULL`. Індекс на `age` прискорить часті запити.

## Приклад

```sql
SELECT id, name, age
FROM users
WHERE age >= $1 AND active = true
ORDER BY age DESC
LIMIT 50;
```

```js
const minAge = Number(req.query.minAge) || 18;
const { rows } = await pool.query(
  'SELECT id, name, age FROM users WHERE age >= $1',
  [minAge]
);
```

## Юз кейси

- API `GET /users?minAge=21` для маркетингових сегментів
- Звіт «користувачі 18+» для compliance
- Комбінація фільтрів: вік + місто + active

## Документація

- [PostgreSQL — SELECT](https://www.postgresql.org/docs/current/sql-select.html)
