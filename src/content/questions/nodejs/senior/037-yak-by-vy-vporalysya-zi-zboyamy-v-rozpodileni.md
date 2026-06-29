---
title: "Як би ви впоралися зі збоями в розподіленій системі (Failed message processing, dead letter queue)?"
topic: nodejs
grade: senior
category: "Мікросервіси"
order: 37
difficulty: hard
---

## Відповідь

Flow збійного повідомлення: **retry** з exponential backoff + jitter (тимчасові помилки: мережа, 503); max attempts → **DLQ** (Dead Letter Queue) для ручного перегляду/replay. **Idempotent consumer** — dedup за messageId/eventId.

Класифікація помилок: transient (retry) vs poison (одразу в DLQ). **Circuit breaker** на downstream-викликах. Алерт на поріг глибини DLQ.

Інструменти replay: admin API/script з audit log. Виправлення root cause перед масовим replay. Saga compensations для часткового збою.

## Приклад

```js
async function consume(message) {
  try {
    await processPayment(message);
    await channel.ack(message);
  } catch (err) {
    if (isTransient(err) && message.fields.redeliveredCount < 5) {
      await channel.nack(message, false, true); // requeue
    } else {
      await channel.sendToQueue('payments.dlq', message.content);
      await channel.ack(message);
      metrics.increment('payments.dlq');
    }
  }
}
```

## Юз кейси

- Обробка payment webhook з SQS DLQ + CloudWatch alarm
- Kafka consumer застряг на poison message — skip у DLQ topic
- Replay 500 failed orders після виправлення бага в handler

## Документація

- [Dead Letter Queue pattern — AWS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)
