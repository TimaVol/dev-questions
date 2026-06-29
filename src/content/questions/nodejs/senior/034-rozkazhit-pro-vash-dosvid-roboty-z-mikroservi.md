---
title: "Розкажіть про ваш досвід роботи з мікросервісами в Node.js. Як ви забезпечували комунікацію між різними сервісами?"
topic: nodejs
grade: senior
category: "Мікросервіси"
order: 34
difficulty: hard
---

## Відповідь

Типова комунікація: **sync** — REST/gRPC для query/command з низькою latency та потребою в негайній консистентності; **async** — Kafka/RabbitMQ для domain events, decoupling, буферизації піків.

Патерни: API Gateway для зовнішніх клієнтів; internal service mesh або прямі виклики з mTLS; BFF для агрегації mobile/web. Контракт: OpenAPI/Protobuf + consumer-driven contract tests (Pact).

Стійкість: timeouts, retries з exponential backoff (лише для ідемпотентних), circuit breaker (opossum), bulkhead isolation. Observability: distributed tracing (W3C traceparent), correlation IDs.

Антипатерни: sync-ланцюжок A→B→C→D (latency множиться); спільна БД; дрібні chatty-виклики без batch API.

## Приклад

```js
// gRPC internal + event publish
async function createOrder(dto) {
  const user = await userClient.getUser({ id: dto.userId }); // sync, timeout 2s
  const order = await orderRepo.create(dto);
  await eventBus.publish('order.created', { orderId: order.id, userId: user.id });
  return order;
}
```

## Юз кейси

- Order service сповіщає inventory через Kafka event
- BFF агрегує 3 мікросервіси для домашнього екрану mobile
- Service discovery у K8s через DNS + health checks

## Документація

- [Microservices — martinfowler.com](https://martinfowler.com/articles/microservices.html)
