---
title: "Наведіть найкращі практики для обробки помилок в асинхронному коді."
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 28
difficulty: medium
---

## Відповідь

- **async/await + try/catch** на межі (handler, job runner) — не кожен рядок. 2. **Ніколи порожній catch** — лог + rethrow або перетворення в domain error. 3. **Ланцюжок `cause`**: `throw new Error('failed', { cause: err })`. 4. **`unhandledRejection`/`uncaughtException`** — лог + graceful shutdown (не покладайтеся як на flow control). 5. **Типізовані помилки** з `code` (ENOENT, ECONNREFUSED) для розгалуження. 6. **AbortSignal** для поширення скасування. 7. **Result pattern** (`{ ok, error }`) де throw неприйнятний. 8. Централізований error middleware в HTTP frameworks.

## Приклад

```js
async function handleOrder(orderId) {
  try {
    const order = await db.getOrder(orderId);
    await payment.charge(order);
  } catch (err) {
    if (err.code === 'CARD_DECLINED') {
      return { ok: false, reason: 'payment' };
    }
    throw new Error(`Order ${orderId} failed`, { cause: err });
  }
}

process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'unhandled rejection');
  shutdown(1);
});
```

## Юз кейси

- Глобальний error handler Express/Fastify
- Політики збоїв BullMQ / cron job
- Saga compensation при частковому збої

## Документація

- [async/await — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
