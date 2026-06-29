---
title: "Опишіть дизайн-паттерн SAGA. Яка різниця між транзакцією та операцією компенсації в SAGA, в SOA?"
topic: nodejs
grade: senior
category: "Архітектура"
order: 19
difficulty: hard
---

## Відповідь

**Saga** — розподілена транзакція як послідовність локальних ACID-транзакцій з компенсуючими транзакціями при збої. Немає глобального 2PC-lock — eventual consistency між сервісами.

**Choreography** — сервіси реагують на події; **Orchestration** — центральний координатор викликає кроки. **Compensating action** — семантичне скасування (скасувати бронювання, повернути платіж), а не rollback БД іншого сервісу.

У класичній SOA монолітна TX — ACID між таблицями. У мікросервісах saga — кожен крок commit'иться незалежно; при збої → компенсації у зворотному порядку. Компенсації теж можуть падати — потрібні retry, ручне втручання, ідемпотентність.

## Приклад

```js
// Orchestrator sketch: order saga
async function createOrderSaga(order) {
  const steps = [];
  try {
    steps.push(await paymentService.charge(order));      // T1
    steps.push(await inventoryService.reserve(order));   // T2
    await shippingService.schedule(order);               // T3
  } catch (err) {
    for (const step of steps.reverse()) {
      await step.compensate(); // refund, release inventory
    }
    throw err;
  }
}
```

## Юз кейси

- Оформлення замовлення в e-commerce між сервісами payment/inventory/shipping
- Вибір saga vs 2PC для банківської інтеграції
- Проєктування компенсації «скасувати бронювання» vs «видалити рядок»

## Документація

- [Saga pattern — microservices.io](https://microservices.io/patterns/data/saga.html)
