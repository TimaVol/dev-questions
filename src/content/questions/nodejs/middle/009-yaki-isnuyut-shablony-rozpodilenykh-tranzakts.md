---
title: "Які існують шаблони розподілених транзакцій?"
topic: nodejs
grade: middle
category: "Node.js"
order: 9
difficulty: medium
---

## Відповідь

Класичний 2PC (two-phase commit) у мікросервісах рідко використовують — він блокує і не масштабується. Популярніші патерни:

- **Saga** — ланцюжок локальних транзакцій з compensating actions при відкаті (choreography через events або orchestration через coordinator)
- **Outbox pattern** — запис події в БД разом з бізнес-даними, окремий relay публікує в Kafka/RabbitMQ
- **Eventual consistency** — прийняти тимчасову неконсистентність, idempotent consumers
- **TCC** (Try-Confirm-Cancel) — три фази резервування ресурсу

У Node.js типово: saga через Bull/BullMQ + compensating HTTP calls.

## Приклад

```js
// Saga: створити замовлення → списати оплату → якщо fail — скасувати замовлення
async function createOrder(data) {
  const order = await orderService.create(data);
  try {
    await paymentService.charge(order.id, data.amount);
  } catch (err) {
    await orderService.cancel(order.id); // compensating action
    throw err;
  }
  await eventBus.publish('order.created', { orderId: order.id });
}
```

## Юз кейси

- E-commerce: order + payment + inventory
- Outbox для guaranteed delivery подій у Kafka
- Idempotent webhook handlers для Stripe

## Документація

- [PostgreSQL — Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
- [Saga pattern — microservices.io](https://microservices.io/patterns/data/saga.html)
