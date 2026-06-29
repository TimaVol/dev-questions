---
title: "Що таке concurrent locking в базі даних?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 56
difficulty: hard
---

## Відповідь

Concurrent locking — механізми координації паралельних TX: **row-level locks** (`FOR UPDATE`, `FOR NO KEY UPDATE`), **table locks**, **advisory locks** (PostgreSQL `pg_advisory_lock`), **MVCC** (читачі не блокують письменників у PG).

**Deadlock** — циклічне очікування; БД виявляє і abort'ить одну TX. **Lock timeout** — уникнення нескінченного очікування. **Intent locks** на вищих рівнях у деяких БД.

Обирайте песимістичний lock при високій конкуренції і дорогому retry; оптимістичний — коли конфлікти рідкі. Моніторинг `pg_locks`, slow query log під час очікування locks.

## Приклад

```sql
-- Row-level exclusive lock
BEGIN;
SELECT * FROM inventory WHERE sku = 'ABC' FOR UPDATE;
-- other TX blocks here until COMMIT
UPDATE inventory SET qty = qty - 1 WHERE sku = 'ABC';
COMMIT;

-- Advisory lock for cron job single-runner
SELECT pg_try_advisory_lock(12345);
```

## Юз кейси

- Запобігання подвійному бронюванню останнього місця
- Distributed cron — advisory lock vs Redis lock
- Дебаг графа deadlock у логах PostgreSQL

## Документація

- [PostgreSQL — Explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html)
