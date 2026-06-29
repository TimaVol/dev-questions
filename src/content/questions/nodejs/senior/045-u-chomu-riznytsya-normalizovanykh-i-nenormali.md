---
title: "У чому різниця нормалізованих і ненормалізованих даних? Наведіть приклад, коли які краще використовувати."
topic: nodejs
grade: senior
category: "Бази даних"
order: 45
difficulty: medium
---

## Відповідь

**Нормалізовані** (1NF–3NF+) — мінімальне дублювання, цілісність через FK, UPDATE в одному місці. JOIN для читання. Ідеально для OLTP write-heavy транзакційних систем.

**Денормалізовані** — надлишкові копії для продуктивності читання (embedded JSON, summary tables, materialized views). Швидше читання, повільніше/складніше запис, ризик неконсистентності.

**Коли денормалізувати**: read-heavy дашборди, пошукові індекси (копія в Elasticsearch), CQRS read models, cache tables. **Коли нормалізувати**: замовлення, платежі, основні дані профілів.

Eventual sync денормалізованих копій через triggers, CDC або application events.

## Приклад

```sql
-- Normalized
orders(id, user_id, total);  users(id, name, email);

-- Denormalized read model for order list UI
order_list_view(order_id, user_name, email, total, created_at);
-- updated by trigger or event consumer
```

## Юз кейси

- Пошук у каталозі товарів — денормалізований індекс ES
- Фінансові транзакції — суворо нормалізовані + audit
- CQRS: нормалізована write БД, денормалізоване read сховище

## Документація

- [PostgreSQL — Data types](https://www.postgresql.org/docs/current/datatype.html)
- [Prisma — Docs](https://www.prisma.io/docs)
