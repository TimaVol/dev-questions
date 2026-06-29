---
title: "Чи кращі Promises за callback підхід? Чому?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 39
difficulty: easy
---

## Відповідь

Так, для більшості backend-коду Promises/async-await кращі:

- **Flat code** — без pyramid of doom
- **Unified error handling** — `.catch()` / try/catch замість `if (err)` на кожному рівні
- **Composition** — `Promise.all`, `race`, chaining
- **Debugging** — stack traces через async/await
- **Interop** — стандарт для fetch, pg, modern fs/promises

Callbacks не гірші за performance — це питання ergonomics. Streams і events досі callback/event-based.

## Приклад

```js
// Callback hell
getUser(id, (err, user) => {
  if (err) return handle(err);
  getOrders(user.id, (err, orders) => {
    if (err) return handle(err);
    getPayments(orders[0].id, (err, payments) => { /* ... */ });
  });
});

// Async/await
try {
  const user = await getUser(id);
  const orders = await getOrders(user.id);
  const payments = await getPayments(orders[0].id);
} catch (err) {
  handle(err);
}
```

## Юз кейси

- Refactor legacy Express callbacks → promisify
- Bluebird historically; native Promises since Node 10+
- Keep callbacks only for hot-path EventEmitter handlers

## Документація

- [Promise — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Promise)
