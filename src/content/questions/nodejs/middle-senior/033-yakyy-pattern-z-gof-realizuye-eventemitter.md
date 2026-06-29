---
title: "Який паттерн з GoF реалізує EventEmitter?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 33
difficulty: hard
---

## Відповідь

`EventEmitter` — реалізація патерну **Observer** (варіант Publish-Subscribe). Subject (`emitter`) зберігає список observers (listeners); `emit(event, data)` сповіщає всіх підписників; `on`/`once`/`off` керують підпискою. Розв'язування: publisher не знає конкретних subscribers. У Node core: `net.Server`, `stream`, `process` — усі extends EventEmitter. Відмінність від класичного Observer: string-based імена подій, sync виклик callback (може блокувати), немає interface contract на подію.

## Приклад

```js
import { EventEmitter } from 'node:events';

class OrderService extends EventEmitter {
  async place(order) {
    await db.insert(order);
    this.emit('order:created', order); // notify all listeners
  }
}

const orders = new OrderService();
orders.on('order:created', (o) => email.sendReceipt(o));
orders.on('order:created', (o) => analytics.track('purchase', o));
```

## Юз кейси

- In-process event bus у monolith
- Життєвий цикл stream (`data`, `end`, `error` events)
- Plugin hooks у frameworks (Fastify `fastify.addHook`)

## Документація

- [Events — Node.js](https://nodejs.org/api/events.html)
- [Design Patterns](https://refactoring.guru/design-patterns)
