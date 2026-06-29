---
title: "Наведіть приклади імплементації GoF патернів у Node.js і фреймворках."
topic: nodejs
grade: senior
category: "Архітектура"
order: 24
difficulty: hard
---

## Відповідь

GoF-патерни в екосистемі Node.js часто «нативні» через ідіоми JS:

- **Singleton** — один пул БД, NestJS `@Injectable()` зі scope за замовчуванням
- **Factory** — `createTransport('kafka' | 'redis')` для message broker
- **Strategy** — взаємозамінний інтерфейс платіжних провайдерів
- **Observer** — `EventEmitter`, RxJS streams, domain events
- **Decorator** — NestJS `@UseGuards`, `@CacheKey`; HOC middleware
- **Adapter** — обгортка стороннього SDK під внутрішній інтерфейс
- **Proxy** — кешуючий proxy навколо repository

На рівні senior: не патерн заради патерну — застосовуйте, коли є точка варіації або потрібна тестованість.

## Приклад

```js
// Strategy — payment providers
class StripeStrategy {
  async charge(amount) { /* stripe API */ }
}
class PayPalStrategy {
  async charge(amount) { /* paypal API */ }
}

class PaymentService {
  constructor(strategy) { this.strategy = strategy; }
  pay(order) { return this.strategy.charge(order.total); }
}

// Observer — domain events
orderEmitter.on('order.created', sendConfirmationEmail);
```

## Юз кейси

- Plugin-архітектура для multi-provider сповіщень
- Тестування через mock Strategy без реальних API-викликів
- Система модулів NestJS як composition root (DI)

## Документація

- [Design Patterns](https://refactoring.guru/design-patterns)
