---
title: "Що таке ORM і для чого її використовують?"
topic: nodejs
grade: junior
category: "Бази даних"
order: 41
difficulty: easy
---

## Відповідь

ORM (Object-Relational Mapping) — шар між JS-об'єктами і реляційною БД. Мапить таблиці на класи/моделі, генерує SQL, керує зв'язками. У Node: Prisma, TypeORM, Sequelize, Drizzle. Плюси: швидша розробка, типізація, міграції. Мінуси: складні запити й N+1 — іноді простіше raw SQL.

## Приклад

```js
// Prisma
const user = await prisma.user.create({
  data: { email: 'ann@example.com', name: 'Ann' },
});

const users = await prisma.user.findMany({
  where: { active: true },
  include: { orders: true },
});
```

## Юз кейси

- CRUD API без ручного SQL для кожної таблиці
- Міграції схеми разом із кодом
- Raw query через ORM для складних звітів

## Документація

- [Prisma — Docs](https://www.prisma.io/docs)
