---
title: "Що краще: окремі бази даних для окремих мікросервісів чи одна база даних для всіх мікросервісів? Чому?"
topic: nodejs
grade: senior
category: "Мікросервіси"
order: 41
difficulty: hard
---

## Відповідь

**Database per service** — канонічний патерн мікросервісів: слабке зв'язування, незалежний deploy/еволюція схеми, автономія команд, технологічна гетерогенність (Postgres + Mongo на домен).

**Shared database** — антипатерн для мікросервісів: зміни схеми поширюються між командами, приховане зв'язування через JOIN, bottleneck масштабування, розмиті межі bounded context.

Виняток: перехідна декомпозиція monolith (Strangler) — тимчасова спільна БД зі суворим володінням схемою на таблицю. Синхронізація даних через events/API, не прямі cross-DB запити.

Відповідь senior: окремі БД + eventual consistency; cross-service запити через API composition або read model (CQRS).

## Приклад

```js
// Anti-pattern: order service querying user table directly
const user = await sharedDb.query('SELECT * FROM users WHERE id = $1', [order.userId]);

// Correct: call User service API or local denormalized cache
const user = await userClient.getUser(order.userId);
```

## Юз кейси

- Декомпозиція monolith — коли розділяти БД, а коли спочатку код
- Звітність/аналітика через event stream, не JOIN у спільній БД
- Переговори про межі команд щодо володіння схемою

## Документація

- [Microservices — martinfowler.com](https://martinfowler.com/articles/microservices.html)
