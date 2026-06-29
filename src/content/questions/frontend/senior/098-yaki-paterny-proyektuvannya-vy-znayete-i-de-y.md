---
title: "Які патерни проєктування ви знаєте і де їх застосовувати?"
topic: frontend
grade: senior
category: "Архітектура"
order: 98
difficulty: hard
---

## Відповідь

GoF + frontend-relevant: **Observer** (events, stores), **Strategy** (payment/shipping), **Factory** (component variants), **Adapter** (legacy API), **Facade** (спрощення complex SDK), **Decorator** (HOC, middleware), **Composite** (UI trees), **Command** (undo/redo), **Singleton** (уникати — module scope), **Module** (ES modules). Architectural: **Container/Presentational**, **BFF**, **CQRS** (read/write split), **Event Sourcing** (audit UI). Застосовувати, коли складність виправдана — не кожна форма потребує Command pattern.

## Приклад

Strategy — payment methods:

```ts
interface PaymentStrategy {
  pay(amount: number): Promise<PaymentResult>;
}

class StripeStrategy implements PaymentStrategy {
  async pay(amount) { /* stripe.confirmPayment */ }
}
class CashOnDeliveryStrategy implements PaymentStrategy {
  async pay(amount) { return { status: 'pending', method: 'cod' }; }
}

function checkout(strategy: PaymentStrategy, amount: number) {
  return strategy.pay(amount);
}
```

Adapter — legacy REST to clean interface:

```ts
const legacyUserApi = {
  async fetchUserData(userIdentifier: string) {
    const raw = await fetch(`/legacy?uid=${userIdentifier}`).then(r => r.json());
    return { id: raw.USER_ID, name: `${raw.FN} ${raw.LN}`, email: raw.EMAIL_ADDR };
  },
};
```

## Юз кейси

- Multi-tenant theming: Strategy на tenant config loader
- Third-party analytics: Adapter обгортає gtag/mixpanel за `analytics.track()`
- Form wizard undo: Command pattern stack

## Документація

- [Design Patterns](https://refactoring.guru/design-patterns)
