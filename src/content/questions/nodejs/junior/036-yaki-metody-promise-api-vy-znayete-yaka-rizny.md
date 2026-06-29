---
title: "Які методи Promise API ви знаєте? Яка різниця між ними?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 36
difficulty: easy
---

## Відповідь

Статичні методи Promise:

- **`Promise.all(iterable)`** — чекає всі; перша помилка → reject.
- **`Promise.allSettled(iterable)`** — чекає всі; результат `{ status, value|reason }`.
- **`Promise.race(iterable)`** — перший settled (fulfilled або rejected).
- **`Promise.any(iterable)`** — перший fulfilled; якщо всі rejected → AggregateError.
- **`Promise.resolve/reject(value)`** — обгортка в Promise.

## Приклад

```js
const [user, orders] = await Promise.all([
  db.getUser(id),
  db.getOrders(id),
]);

const results = await Promise.allSettled([
  fetch('https://api-a.com'),
  fetch('https://api-b.com'),
]);
// одна впала — інша все одно повернулась
```

## Юз кейси

- `Promise.all` — паралельне завантаження user + permissions
- `Promise.race` — timeout обгортка над fetch
- `Promise.any` — fallback між кількома CDN-URL

## Документація

- [Promise — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Promise)
