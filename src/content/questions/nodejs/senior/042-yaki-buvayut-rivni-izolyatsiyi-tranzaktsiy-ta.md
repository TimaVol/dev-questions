---
title: "Які бувають рівні ізоляції транзакцій та чим вони відрізняються?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 42
difficulty: hard
---

## Відповідь

Рівні ізоляції SQL (ANSI):

- **READ UNCOMMITTED** — можливі dirty reads (PostgreSQL трактує як READ COMMITTED).
- **READ COMMITTED** — бачимо лише committed data; можливі non-repeatable reads і phantom reads. Дефолт у PG.
- **REPEATABLE READ** — узгоджений snapshot для транзакції; phantom можливі в деяких БД (у PG — ні, через MVCC).
- **SERIALIZABLE** — ніби послідовне виконання; найвища консистентність, найбільше блокувань/конфліктів.

Вищий рівень → менше аномалій, більше locks/retries. Вибір за бізнес-толерантністю: фінансовий ledger — SERIALIZABLE або явні locks; аналітика — READ COMMITTED достатньо.

## Приклад

```sql
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT balance FROM accounts WHERE id = 1; -- 100
-- інша TX не змінить те, що ми вже прочитали в цій TX
SELECT balance FROM accounts WHERE id = 1; -- still 100
COMMIT;
```

## Юз кейси

- Переказ між рахунками — REPEATABLE READ + row lock
- Генерація звіту — snapshot READ COMMITTED достатньо
- Дебаг phantom reads у резервуванні інвентарю

## Документація

- [PostgreSQL — Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
