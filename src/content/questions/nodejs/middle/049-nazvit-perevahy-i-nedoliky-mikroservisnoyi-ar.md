---
title: "Назвіть переваги і недоліки мікросервісної архітектури."
topic: nodejs
grade: middle
category: "Мікросервіси"
order: 49
difficulty: medium
---

## Відповідь

**Переваги:**
- Independent deploy і scaling per service
- Technology diversity (Node + Go + Python)
- Fault isolation — падіння одного сервісу не валить все
- Team ownership — bounded context (DDD)
- Smaller codebase per team

**Недоліки:**
- Distributed complexity: network latency, partial failures
- Data consistency — sagas замість ACID transactions
- Operational overhead: K8s, service mesh, observability
- Testing складніший — integration, contract tests
- Duplication infrastructure (auth, logging у кожному)

## Приклад

```js
// Cross-service call — latency + failure handling
async function createOrder(data) {
  const user = await fetch(`${USER_SERVICE}/users/${data.userId}`).then(r => r.json());
  if (!user.active) throw new Error('User suspended');

  const payment = await fetch(`${PAYMENT_SERVICE}/charge`, {
    method: 'POST',
    body: JSON.stringify({ amount: data.total }),
  });
  if (!payment.ok) throw new Error('Payment failed');

  return orderRepo.create(data);
}
```

## Юз кейси

- Extract payment service when PCI compliance needed
- Scale notification service independently on Black Friday
- Avoid microservices until org has DevOps maturity

## Документація

- [Microservices — martinfowler.com](https://martinfowler.com/articles/microservices.html)
