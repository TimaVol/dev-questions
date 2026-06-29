---
title: "Які ви знаєте популярні методології реалізації async-зв'язку між сервісами в архітектурі мікросервісу? Які є плюси та мінуси?"
topic: nodejs
grade: middle
category: "Мікросервіси"
order: 66
difficulty: medium
---

## Відповідь

| Патерн | Плюси | Мінуси |
|--------|-------|--------|
| **Message Queue** (RabbitMQ, SQS) | Buffering, decoupling, retry | Ordering, poison messages |
| **Event Streaming** (Kafka) | Replay, high throughput, log | Complexity, operational cost |
| **Pub/Sub** (Redis, GCP Pub/Sub) | Simple broadcast | No persistence (Redis) |
| **Webhooks** | Push to external systems | Delivery guarantees, retries |
| **Saga** | Distributed transactions | Compensating logic complexity |

Node.js libs: `kafkajs`, `amqplib`, `bullmq` (Redis-backed jobs).

## Приклад

```js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ brokers: ['kafka:9092'] });
const producer = kafka.producer();

await producer.connect();
await producer.send({
  topic: 'inventory.reserved',
  messages: [{ key: orderId, value: JSON.stringify({ sku, qty }) }],
});

// Consumer in inventory-service
const consumer = kafka.consumer({ groupId: 'inventory' });
await consumer.subscribe({ topic: 'inventory.reserved' });
await consumer.run({
  eachMessage: async ({ message }) => {
    await inventoryRepo.decrement(JSON.parse(message.value.toString()));
  },
});
```

## Юз кейси

- Kafka: event sourcing, audit log
- BullMQ: job retries with backoff in Node.js
- Dead letter queue for failed message processing

## Документація

- [Saga pattern — microservices.io](https://microservices.io/patterns/data/saga.html)
- [Apache Kafka](https://kafka.apache.org/documentation/)
