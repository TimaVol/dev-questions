---
title: "Для чого і як використовують клас EventEmitter з базового модуля ’node:events’?"
topic: nodejs
grade: middle
category: "Node.js"
order: 17
difficulty: medium
---

## Відповідь

`EventEmitter` — патерн pub/sub у Node.js. Багато core API наслідують його (`net.Server`, `stream.Readable`, `process`). Методи: `on`/`emit`/`once`/`off`. `emitter.on('event', fn)` — підписка; `emitter.emit('event', data)` — публікація.

Використовують для decoupling: сервіси не знають один про одного, а слухають події доменної моделі (order.created, user.registered).

## Приклад

```js
import { EventEmitter } from 'node:events';

class OrderService extends EventEmitter {
  async create(data) {
    const order = await db.orders.insert(data);
    this.emit('order:created', order);
    return order;
  }
}

const orders = new OrderService();
orders.on('order:created', (order) => {
  emailQueue.add('confirmation', { orderId: order.id });
});
```

## Юз кейси

- Domain events між модулями без tight coupling
- Custom stream з власними подіями
- Plugin architecture: `app.on('plugin:loaded', handler)`

## Документація

- [Events — Node.js](https://nodejs.org/api/events.html)
