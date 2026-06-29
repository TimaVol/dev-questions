---
title: "Чим LEFT відрізняється від INNER?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 79
difficulty: easy
---

## Відповідь

**INNER JOIN** — повертає rows лише коли є match в **обох** tables. Якщо user без orders — не потрапить у result.

**LEFT JOIN** (LEFT OUTER JOIN) — **всі rows з лівої** table + matching з правої. Якщо match немає — праві columns = NULL.

Коли LEFT: потрібні records навіть без related data (users without orders, products never sold).

Коли INNER: лише records з повним зв'язком (orders that have valid user).

## Приклад

```sql
-- Users who placed at least one order
SELECT u.email, o.total
FROM users u
INNER JOIN orders o ON o.user_id = u.id;

-- All users, NULL total if no orders
SELECT u.email, o.total
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;

-- Filter LEFT JOIN result: users with NO orders
SELECT u.email
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;
```

## Юз кейси

- INNER: active subscriptions report
- LEFT: marketing list of users who never purchased
- COUNT with LEFT JOIN для zero-count entities

## Документація

- [SQL JOIN — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Join)
