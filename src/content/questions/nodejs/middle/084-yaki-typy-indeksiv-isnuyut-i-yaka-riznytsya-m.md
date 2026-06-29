---
title: "Які типи індексів існують і яка різниця між ними?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 84
difficulty: medium
---

## Відповідь

Типи індексів Postgres:

- **B-tree** (за замовчуванням) — рівність, діапазон, сортування (`=`, `<`, `>`, `ORDER BY`)
- **Hash** — лише рівність (`=`), не діапазон; рідко використовують
- **GIN** — складні значення: масиви, JSONB, повнотекстовий пошук
- **GiST** — геометрія, повнотекст, nearest-neighbor
- **BRIN** — діапазони блоків, великі послідовні таблиці (timestamps, логи)
- **Partial index** — індекс підмножини рядків (`WHERE active = true`)
- **Unique index** — гарантує унікальність + швидкий пошук

Композитний B-tree: правило лівого префікса — `(a, b)` допомагає для `WHERE a = ?` і `WHERE a = ? AND b = ?`.

## Приклад

```sql
-- B-tree for login
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- GIN for JSONB search
CREATE INDEX idx_products_attrs ON products USING GIN (attributes);

-- Partial index — smaller, faster for common filter
CREATE INDEX idx_orders_pending ON orders(created_at)
WHERE status = 'pending';

-- Full-text search
CREATE INDEX idx_articles_fts ON articles USING GIN (to_tsvector('english', body));
```

## Юз кейси

- B-tree: колонки FK, пошук за email
- GIN: запити на місткість JSONB `@>`
- BRIN: таблиця time-series логів за created_at

## Документація

- [PostgreSQL — Index types](https://www.postgresql.org/docs/current/indexes-types.html)
