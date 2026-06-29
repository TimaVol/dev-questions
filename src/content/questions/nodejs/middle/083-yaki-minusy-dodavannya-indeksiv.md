---
title: "Які мінуси додавання індексів?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 83
difficulty: medium
---

## Відповідь

Недоліки indexes:

- **Write overhead** — INSERT/UPDATE/DELETE must update index tree
- **Storage** — кожен index займає disk space (може бути GB на великих tables)
- **Wrong index** — planner може обрати гірший plan; unused indexes — pure cost
- **Too many indexes** — optimizer confusion, maintenance burden
- **Low cardinality columns** — index на boolean/status часто useless (seq scan anyway)
- **Index bloat** — потребує REINDEX/VACUUM (Postgres)

Rule: index columns у WHERE/JOIN/ORDER BY high-cardinality queries; monitor `pg_stat_user_indexes` для unused.

## Приклад

```sql
-- Over-indexed table — 5 indexes, writes slow
CREATE INDEX idx1 ON events(type);
CREATE INDEX idx2 ON events(created_at);
CREATE INDEX idx3 ON events(user_id);
CREATE INDEX idx4 ON events(type, created_at);
CREATE INDEX idx5 ON events(user_id, type, created_at);
-- idx1, idx2, idx3 likely redundant if idx5 exists

-- Find unused indexes (Postgres)
SELECT indexrelname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0;
```

## Юз кейси

- Drop unused indexes after monitoring period
- Partial index: `WHERE deleted_at IS NULL` для soft delete
- Avoid indexing every column «just in case»

## Документація

- [PostgreSQL — Indexes](https://www.postgresql.org/docs/current/indexes.html)
