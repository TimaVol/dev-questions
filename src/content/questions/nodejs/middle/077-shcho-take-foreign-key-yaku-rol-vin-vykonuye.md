---
title: "Що таке foreign key? Яку роль він виконує?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 77
difficulty: medium
---

## Відповідь

**Foreign key (FK)** — constraint, що зв'язує column з primary key (або unique) іншої таблиці. Забезпечує **referential integrity**.

Дії:
- **ON DELETE CASCADE** — видалення parent видаляє children
- **ON DELETE SET NULL** — orphan FK → NULL
- **ON DELETE RESTRICT** — заборона delete parent якщо є children
- **ON UPDATE CASCADE** — propagate key changes

Без FK — orphan records, inconsistent joins, bugs на application level.

## Приклад

```sql
CREATE TABLE orders (
  id         UUID PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
  id       UUID PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  sku      VARCHAR(50) NOT NULL,
  qty      INT NOT NULL
);
-- Delete order → items cascade deleted
-- Delete user with orders → RESTRICT error
```

## Юз кейси

- RESTRICT delete user with active orders
- CASCADE delete order_items when order deleted
- FK indexes для JOIN performance

## Документація

- [PostgreSQL — Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
