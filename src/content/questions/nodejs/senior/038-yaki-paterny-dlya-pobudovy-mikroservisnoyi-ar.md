---
title: "Які патерни для побудови мікросервісної архітектури ви використовували?"
topic: nodejs
grade: senior
category: "Мікросервіси"
order: 38
difficulty: hard
---

## Відповідь

Основні патерни: **API Gateway** (routing, auth, rate limit); **BFF** (агрегація під клієнта); **Database per service**; **Saga** (розподілена TX); **CQRS** (розділення read/write); **Event-driven** (domain events, event sourcing де виправдано); **Circuit Breaker**; **Bulkhead**; **Sidecar/Service Mesh** (Istio — mTLS, retries на рівні інфраструктури).

Допоміжні: **Outbox pattern** (надійна публікація подій); **Backend for Frontend**; **Strangler Fig** migration; **Anti-corruption layer** для інтеграції з legacy.

Вибір патерну за проблемою, не за каталогом. Over-engineering — mesh + CQRS + ES для CRUD-застосунку.

## Приклад

```js
// Outbox: same DB transaction as business write
await db.$transaction(async (tx) => {
  await tx.order.create({ data: order });
  await tx.outbox.create({
    data: { topic: 'order.created', payload: order, published: false },
  });
});
// Separate poller publishes outbox → Kafka
```

## Юз кейси

- E-commerce: CQRS для read replicas каталогу
- Інтеграція з legacy ERP через anti-corruption layer
- Надійні domain events з transactional outbox

## Документація

- [Microservices — martinfowler.com](https://martinfowler.com/articles/microservices.html)
- [Design Patterns](https://refactoring.guru/design-patterns)
