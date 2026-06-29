---
title: "Порівняйте MessageQ, RabbitMQ і Kafka."
topic: nodejs
grade: senior
category: "Архітектура"
order: 25
difficulty: hard
---

## Відповідь

**Generic Message Queue** — абстракція: producer → queue → consumer; at-least-once, competing consumers.

**RabbitMQ** — розумний broker, «простий» consumer. Exchanges (direct/topic/fanout), черги, routing keys, DLQ, пріоритети. Добре для task queues, RPC, складного маршрутизації, помірного throughput. Повідомлення видаляються після ack.

**Kafka** — «простий» broker, розумний consumer. Розподілений commit log, партиції, consumer groups, retention/replay, високий throughput. Event sourcing, stream processing, audit trail. Не ідеальний для класичної job queue без додаткових патернів.

**SQS** (AWS) — managed, простий, at-least-once, visibility timeout — для serverless Node Lambdas.

Вибір: Kafka — event stream + replay; Rabbit — work queues + routing; SQS — простота в AWS.

## Приклад

```js
// RabbitMQ — task queue
await channel.assertQueue('emails', { durable: true });
channel.sendToQueue('emails', Buffer.from(JSON.stringify(payload)), { persistent: true });

// Kafka — event log (conceptual with kafkajs)
await producer.send({ topic: 'orders', messages: [{ key: orderId, value: JSON.stringify(event) }] });
```

## Юз кейси

- Події замовлення для 5 downstream consumers — Kafka
- Фонові email-задачі з retry — RabbitMQ
- Lambda fan-out від завантаження в S3 — SQS

## Документація

- [Apache Kafka](https://kafka.apache.org/documentation/)
- [RabbitMQ — Documentation](https://www.rabbitmq.com/docs)
