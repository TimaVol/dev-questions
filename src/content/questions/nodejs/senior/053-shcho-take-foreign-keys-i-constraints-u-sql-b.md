---
title: "Що таке foreign keys і constraints у SQL базах даних?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 53
difficulty: easy
---

## Відповідь

**Constraints** забезпечують цілісність даних на рівні БД: **PRIMARY KEY**, **UNIQUE**, **NOT NULL**, **CHECK** (правила домену), **FOREIGN KEY** (референційна цілісність між таблицями).

**Foreign key** — дочірня колонка має посилатися на існуючий батьківський рядок. **ON DELETE/UPDATE**: CASCADE (поширення), SET NULL, RESTRICT/NO ACTION (заборона), SET DEFAULT.

Компроміс senior: FK у microservices database per service — лише внутрішні FK; міжсервісні посилання за ID без FK (слабке зв'язування). FK додають overhead lock при видаленні parent — плануйте індекси на FK-колонках.

## Приклад

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  total NUMERIC(12,2) CHECK (total >= 0)
);

CREATE UNIQUE INDEX idx_users_email ON users(email);
```

## Юз кейси

- Запобігання сиротським order-рядкам при видаленні user
- CHECK constraint для enum-подібних значень status
- Міграція з додаванням FK до великої таблиці — VALIDATE CONSTRAINT concurrently (PG)

## Документація

- [PostgreSQL — Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
