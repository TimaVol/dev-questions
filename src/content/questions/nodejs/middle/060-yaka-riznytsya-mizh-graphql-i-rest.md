---
title: "Яка різниця між GraphQL і REST?"
topic: nodejs
grade: middle
category: "Networking & API"
order: 60
difficulty: medium
---

## Відповідь

**REST** — кілька ендпоінтів, фіксована форма відповіді на кожен. Over-fetching (GET /users повертає всі поля) або under-fetching (N+1 запитів для вкладених даних).

**GraphQL** — один ендпоінт `/graphql`, клієнт вказує потрібні поля. Resolver на тип/поле. Інтроспекція, сильна типізація через схему.

Компроміси:
| REST | GraphQL |
|------|---------|
| Просте кешування (за URL) | Складне кешування (POST) |
| HTTP-семантика | Гнучкі запити |
| CDN-friendly GET | Проблема N+1 resolver → DataLoader |
| Зріла екосистема | Обережне еволюціонування схеми |

Node.js: Apollo Server, Mercurius (Fastify), модуль NestJS GraphQL.

## Приклад

```graphql
# Client query — лише потрібні поля
query {
  user(id: "1") {
    name
    orders { id total }
  }
}
```

```js
// Resolver
const resolvers = {
  Query: {
    user: (_, { id }) => db.users.findById(id),
  },
  User: {
    orders: (user) => db.orders.findByUserId(user.id), // DataLoader recommended
  },
};
```

## Юз кейси

- GraphQL: мобільний додаток з різними потребами даних для екранів
- REST: публічне CRUD API, просте кешування
- Патерн BFF: GraphQL-шлюз, що агрегує REST-мікросервіси

## Документація

- [GraphQL — Learn](https://graphql.org/learn/)
