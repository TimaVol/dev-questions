---
title: "Як забезпечити стійкість і можливість масштабування мікросервісів?"
topic: nodejs
grade: middle
category: "Мікросервіси"
order: 50
difficulty: hard
---

## Відповідь

**Патерни стійкості:**
- **Retry + exponential backoff** — тимчасові збої
- **Circuit breaker** — припинення викликів несправного сервісу (opossum, cockatiel)
- **Timeout** — на кожен вихідний виклик
- **Bulkhead** — ізоляція пулів потоків/з'єднань
- **Idempotency keys** — безпечні повторні спроби
- **Dead letter queue** — невдалі повідомлення
- **Health checks** — liveness/readiness проби
- **Graceful degradation** — резервні відповіді

**Масштабування:** безстанні сервіси, горизонтальні поди, автомасштабування (HPA), кеш, асинхронні черги для пікового навантаження.

## Приклад

```js
import CircuitBreaker from 'opossum';

const breaker = new CircuitBreaker(callPaymentService, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30_000,
});

breaker.fallback(() => ({ status: 'pending', message: 'Payment queued' }));

app.post('/orders', async (req, res) => {
  const order = await orderRepo.create(req.body);
  const payment = await breaker.fire(order.id, order.total);
  res.json({ order, payment });
});
```

## Юз кейси

- K8s HPA за метриками CPU/RPS
- Redis-кеш для read-heavy сервісу каталогу
- Kafka-буфер між сервісами замовлень і виконання

## Документація

- [Microservices — martinfowler.com](https://martinfowler.com/articles/microservices.html)
