---
title: "У яких випадках ви застосували б асинхронний зв’язок між двома системами?"
topic: nodejs
grade: senior
category: "Node.js"
order: 10
difficulty: medium
---

## Відповідь

Async integration (message queue, event bus, webhook callback) — коли: операція триває довше за HTTP timeout; потрібна decoupling і independent scaling; допустима eventual consistency; peak load потребує buffering; downstream може бути недоступний (retry без блокування caller).

Sync REST/gRPC — коли потрібна strong consistency, immediate response, простий query-read. Типові async кейси: відправка email/SMS, генерація PDF/звітів, sync з CRM/ERP, обробка upload → thumbnail, saga steps між microservices.

Anti-pattern: async «бо модно» для read-your-writes flow без compensating UX (користувач не бачить результат).

## Приклад

```js
// API приймає замовлення, публікує event — не чекає fulfillment
app.post('/orders', async (req, res) => {
  const order = await orderService.create(req.body);
  await eventBus.publish('order.created', { orderId: order.id });
  res.status(202).json({ orderId: order.id, status: 'accepted' });
});
```

## Юз кейси

- Checkout → payment + inventory + notification через Kafka
- Bulk import 100k rows без blocking HTTP request
- Circuit breaker + async retry замість sync cascade failure

## Документація

- [async/await — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
