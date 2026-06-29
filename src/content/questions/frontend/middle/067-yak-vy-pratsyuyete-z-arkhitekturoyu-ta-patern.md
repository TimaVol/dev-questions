---
title: "Як ви працюєте з архітектурою та патернами проєктування в JavaScript? Які конкретні патерни використовуєте для структурування коду та полегшення його розширення?"
topic: frontend
grade: middle
category: "JavaScript"
order: 67
difficulty: medium
---

## Відповідь

Використовую Module, Observer, Strategy, Factory — залежно від задачі. Feature folders із чіткими межами, DI через props/context. Strategy — для взаємозамінних алгоритмів (оплата, експорт). Уникаю god objects і циклічних залежностей між модулями.

## Приклад

```ts
interface PaymentStrategy {
  pay(amount: number): Promise<void>;
}

class CardPayment implements PaymentStrategy {
  async pay(amount) {
    await api.chargeCard(amount);
  }
}
```

## Юз кейси

- Strategy для різних способів оплати (карта, Apple Pay)
- Observer/event bus для слабкого зв’язку між модулями
- Factory для рендеру різних типів полів форми

## Документація

- [Design Patterns — refactoring.guru](https://refactoring.guru/design-patterns)
- [Module pattern — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
