---
title: "Що таке аномалії транзакцій (dirty read, dirty write, read skew, phantom read, lost update)?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 44
difficulty: hard
---

## Відповідь

**Dirty read** — читання uncommitted data іншої TX (rollback → прочитали «фантом»). **Dirty write** — перезапис uncommitted змін (рідко при правильному locking).

**Non-repeatable read (read skew)** — двічі читаємо той самий рядок, різні значення (інша TX зробила commit між читаннями). **Phantom read** — повторний range query повертає нові рядки (inserted іншою TX).

**Lost update** — два concurrent read-modify-write, один перезаписує інший. **Write skew** — дві TX читають перетинні набори, роблять неконсистентні concurrent writes (SERIALIZABLE ловить).

Виправлення: рівень ізоляції, `SELECT FOR UPDATE`, optimistic versioning, unique constraints.

## Приклад

```sql
-- Lost update
-- A: SELECT balance=100 → UPDATE 100-10=90
-- B: SELECT balance=100 → UPDATE 100-20=80  (A's debit lost)

-- Optimistic fix
UPDATE accounts SET balance = balance - 10, version = version + 1
WHERE id = 1 AND version = @expectedVersion;
-- 0 rows → retry
```

## Юз кейси

- Запобігання double-spend у wallet service
- Postmortem oversell інвентарю
- Зіставлення аномалії з матрицею рівнів ізоляції

## Документація

- [PostgreSQL — Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
