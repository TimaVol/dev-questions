---
title: "Що таке гарантії доставки повідомлень та якими вони бувають?"
topic: nodejs
grade: senior
category: "Node.js"
order: 9
difficulty: hard
---

## Відповідь

**At-most-once** — повідомлення може загубитись, але не дублюється (fire-and-forget, UDP-like semantics). **At-least-once** — доставка гарантована, можливі дублікати; consumer має бути idempotent. **Exactly-once** — ідеал, на практиці досягається composition: at-least-once + idempotent handler + dedup store (Kafka transactional, outbox pattern).

У distributed systems «exactly-once end-to-end» — маркетинг; реально — «effectively once» через idempotency keys і transactional outbox. Вибір залежить від домену: analytics tolerates loss; payments — at-least-once + idempotency.

Node-сервіси зазвich producer/consumer через RabbitMQ, SQS, Kafka — розуміння ack/retry/DLQ обов'язкове.

## Приклад

```js
// Idempotent consumer — dedup by messageId
async function handlePayment(event) {
  const exists = await db.processedEvents.findUnique({ where: { id: event.id } });
  if (exists) return; // duplicate from at-least-once redelivery

  await db.$transaction([
    db.processedEvents.create({ data: { id: event.id } }),
    db.payments.create({ data: event.payload }),
  ]);
}
```

## Юз кейси

- Проєктування order pipeline з SQS + DLQ
- Вибір між Kafka and RabbitMQ для payment events
- Реалізація outbox pattern у Node + PostgreSQL

## Документація

- [Apache Kafka — Delivery semantics](https://kafka.apache.org/documentation/#semantics)
- [RabbitMQ — Reliability](https://www.rabbitmq.com/docs/reliability)
