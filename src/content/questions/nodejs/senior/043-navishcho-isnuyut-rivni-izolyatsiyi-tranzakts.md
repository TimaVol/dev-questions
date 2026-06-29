---
title: "Навіщо існують рівні ізоляції транзакції? Наведіть приклади."
topic: nodejs
grade: senior
category: "Бази даних"
order: 43
difficulty: medium
---

## Відповідь

Рівні ізоляції — компроміс між **коректністю** і **продуктивністю/конкурентністю**. Повна serializability дорога; більшість OLTP працює зі слабшою ізоляцією + інваріантами на рівні застосунку.

**Приклад проблеми READ COMMITTED**: два concurrent booking attempts обидва бачать «1 місце залишилось» — потрібен `SELECT FOR UPDATE` або unique constraint + retry.

**REPEATABLE READ** для фінансового звіту в TX — баланси не змінюються посеред звіту. **SERIALIZABLE** для інвентарю без явних locks — БД виявляє конфлікти, одна TX abort'иться.

Без розуміння ізоляції — «працює на dev» і race conditions у production.

## Приклад

```sql
-- Lost update без isolation discipline
-- TX1: read count=5, write count=4
-- TX2: read count=5, write count=4  → should be 3

-- Fix: pessimistic lock
BEGIN;
SELECT seats FROM flights WHERE id = 1 FOR UPDATE;
UPDATE flights SET seats = seats - 1 WHERE id = 1;
COMMIT;
```

## Юз кейси

- Проєктування конкурентності системи бронювання місць
- Вибір дефолтної ізоляції в транзакціях Prisma/TypeORM
- Пояснення, чому банківський переказ потребує сильніших гарантій, ніж лічильник переглядів блогу

## Документація

- [PostgreSQL — Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
