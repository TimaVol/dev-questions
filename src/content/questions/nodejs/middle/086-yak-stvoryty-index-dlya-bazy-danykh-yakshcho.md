---
title: "Як створити index для бази даних, якщо вона реляційна?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 86
difficulty: easy
---

## Відповідь

Кроки створення index:

- **Identify slow queries** — `EXPLAIN ANALYZE`, pg_stat_statements, APM
- **Choose columns** — WHERE, JOIN, ORDER BY predicates
- **Choose type** — B-tree default; GIN для JSONB/FTS
- **`CREATE INDEX CONCURRENTLY`** — без lock table у production (Postgres)
- **Verify** — EXPLAIN shows Index Scan instead of Seq Scan
- **Migration tool** — Knex, TypeORM, Flyway для version control

Naming convention: `idx_{table}_{columns}`.

## Приклад

```sql
-- Migration file: 20240115_add_orders_user_index.sql
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_id
  ON orders(user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_created
  ON orders(user_id, created_at DESC);
```

```js
// Knex migration
export async function up(knex) {
  await knex.schema.raw(`
    CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders(user_id)
  `);
}

export async function down(knex) {
  await knex.schema.raw('DROP INDEX CONCURRENTLY IF EXISTS idx_orders_user_id');
}
```

## Юз кейси

- CONCURRENTLY для zero-downtime on large tables
- Unique index instead of separate constraint + index
- Rollback migration drops index in down()

## Документація

- [PostgreSQL — CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html)
