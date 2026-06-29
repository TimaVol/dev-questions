---
title: "Навіщо потрібні індекси пошуку? Які мінуси в індексів?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 47
difficulty: medium
---

## Відповідь

**Індекси** (B-tree за замовчуванням) — прискорюють SELECT, WHERE, JOIN, ORDER BY по індексованих колонках: O(log n) seek vs seq scan. Порядок у composite index важливий — правило leftmost prefix. Covering index уникає heap lookup.

**Витрати**: дисковий простір; повільніші INSERT/UPDATE/DELETE (підтримка індексу); planner може обрати неправильний індекс → гірше за seq scan; забагато індексів плутає optimizer.

Моніторинг: `EXPLAIN ANALYZE`, pg_stat_user_indexes (idx_scan vs idx_tup_read), видалення невикористаних індексів. Partial indexes для фільтрованих запитів.

## Приклад

```sql
-- Composite index for common query
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 123 ORDER BY created_at DESC LIMIT 20;
-- Index Scan vs Seq Scan
```

## Юз кейси

- Повільний API endpoint — відсутній індекс на foreign key
- Index bloat після bulk delete — обслуговування REINDEX
- Unique index як обмеження конкуренції (унікальність email)

## Документація

- [PostgreSQL — Indexes](https://www.postgresql.org/docs/current/indexes.html)
