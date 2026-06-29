---
title: "Яка концепція sync/async зв'язку між сервісами в архітектурі мікросервісу?"
topic: nodejs
grade: middle
category: "Мікросервіси"
order: 65
difficulty: medium
---

## Відповідь

**Sync (синхронний)** — викликач чекає відповідь: HTTP REST, gRPC. Проста ментальна модель, але зв'язність: ланцюг затримок, каскадні збої, доступність = добуток доступності всіх сервісів.

**Async (асинхронний)** — fire-and-forget або черга повідомлень: викликач не чекає. Розв'язування, буферизація пікового навантаження, стійкість. Компроміс: eventual consistency, складніший дебаг.

Типовий гібрид: sync для user-facing read path, async для побічних ефектів (email, аналітика, виконання замовлень).

## Приклад

```js
// Sync: user waits for payment confirmation
const payment = await fetch(`${PAYMENT_URL}/charge`, { method: 'POST', body });

// Async: order created → event → email service processes independently
await orderRepo.create(order);
await kafka.send({
  topic: 'orders.created',
  messages: [{ value: JSON.stringify({ orderId: order.id }) }],
});
// Response to user immediately, email arrives seconds later
res.status(201).json(order);
```

## Юз кейси

- Sync: GET профілю користувача для логіну
- Async: лист вітання після реєстрації
- Патерн Outbox: надійний async із синхронної транзакції

## Документація

- [Microservices — martinfowler.com](https://martinfowler.com/articles/microservices.html)
