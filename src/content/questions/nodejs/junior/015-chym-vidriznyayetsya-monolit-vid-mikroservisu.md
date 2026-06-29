---
title: "Чим відрізняється моноліт від мікросервісу?"
topic: nodejs
grade: junior
category: "Node.js"
order: 15
difficulty: easy
---

## Відповідь

**Моноліт** — один застосунок/деплой з усією логікою (users, orders, payments в одному репо). Простіший старт, транзакції в одній БД, але важче масштабувати окремі частини.

**Мікросервіси** — незалежні сервіси з власною БД і деплоєм, спілкуються через HTTP/gRPC/черги. Краще масштабування й ізоляція збоїв, але складніша інфраструктура (service discovery, distributed tracing, eventual consistency).

## Приклад

```bash
# Моноліт: один процес
node dist/server.js   # users + orders + payments

# Мікросервіси: окремі процеси
node services/users/index.js
node services/orders/index.js
```

## Юз кейси

- Стартап — моноліт швидше до MVP
- Команда 50+ людей — мікросервіси за доменами (DDD)
- Node як API-шар у обох архітектурах; різниця в межах деплою

## Документація

- [Microservices — martinfowler.com](https://martinfowler.com/articles/microservices.html)
- [Monolith vs Microservices](https://martinfowler.com/bliki/MonolithFirst.html)
