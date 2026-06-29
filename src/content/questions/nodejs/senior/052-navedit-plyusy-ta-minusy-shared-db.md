---
title: "Наведіть плюси та мінуси Shared DB."
topic: nodejs
grade: senior
category: "Бази даних"
order: 52
difficulty: medium
---

## Відповідь

**Плюси Shared DB**: прості JOIN між доменами; одне «джерело правди» без sync; транзакції між таблицями; простіший reporting; швидший старт monolith/міграції.

**Мінуси**: тісне зв'язування — зміна схеми потребує координації всіх сервісів; bottleneck масштабування (один write primary); розмите володіння; залежність деплою; один повільний запит впливає на всіх; слабка межа безпеки (сервіс A читає таблиці сервісу B).

У мікросервісах shared DB — компроміс лише для переходу. Довгостроково — database per service + events.

## Приклад

```sql
-- Shared DB temptation: cross-domain join in one query
SELECT o.id, u.email, p.name
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id;
-- Breaks when products moves to separate service DB
```

## Юз кейси

- Monolith → microservices: планування фази shared DB
- Інцидент: одна міграція заблокувала таблиці для всіх сервісів
- Аналіз вартості: коли окремі RDS-інстанси виправдані

## Документація

- [Database per service — microservices.io](https://microservices.io/patterns/data/database-per-service.html)
