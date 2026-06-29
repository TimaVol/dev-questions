---
title: "Чому властивості ACID важливі для SQL баз даних?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 57
difficulty: easy
---

## Відповідь

ACID гарантує надійні транзакції:

- **Atomicity** — все або нічого; частковий збій відкочує всю TX.
- **Consistency** — TX переводить БД з одного валідного стану в інший (constraints зберігаються).
- **Isolation** — паралельні TX не псують одна одну (за рівнем ізоляції).
- **Durability** — committed data переживає crash (WAL/redo log).

Критично для грошей, інвентарю, бронювань — бізнес-інваріанти залежать від ACID. NoSQL часто жертвує ACID заради масштабу/толерантності до partition (BASE). Node-застосунки не повинні припускати ACID між сервісами — лише в межах однієї транзакції БД.

## Приклад

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- constraint check: no negative balance
COMMIT;
-- crash mid-TX → ROLLBACK, no partial transfer
```

## Юз кейси

- Мікросервіс банківського переказу — межа локальної TX
- Вибір Postgres vs DynamoDB для ledger
- Пояснення, чому dual-write без TX ризикований

## Документація

- [PostgreSQL — Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
