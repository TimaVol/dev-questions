---
title: "Що таке міграція даних? Для чого вона потрібна?"
topic: nodejs
grade: junior
category: "Бази даних"
order: 42
difficulty: easy
---

## Відповідь

Міграція — версіонована зміна схеми БД у коді (up/down скрипти). Дозволяє синхронізувати структуру таблиць між dev/staging/prod і відкочувати зміни. У Node: Prisma Migrate, Knex migrations, TypeORM migrations. На prod застосовують через CI/CD, не вручну в psql.

## Приклад

```sql
-- migrations/20240101_add_users_active.sql
ALTER TABLE users ADD COLUMN active BOOLEAN NOT NULL DEFAULT true;
```

```bash
npx prisma migrate deploy   # prod
npx prisma migrate dev      # dev — створює + застосовує
```

## Юз кейси

- Додати колонку `email_verified_at` без даунтайму (expand-contract)
- Команда з git: schema в репо, не «на око» в БД
- Rollback при невдалому деплої

## Документація

- [Prisma — Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)
