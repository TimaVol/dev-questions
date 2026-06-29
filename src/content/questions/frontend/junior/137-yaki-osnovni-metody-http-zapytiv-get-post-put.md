---
title: "Які основні методи HTTP-запитів (GET, POST, PUT, DELETE) і їхні відмінності?"
topic: frontend
grade: junior
category: "Основи мережі та протоколи"
order: 137
difficulty: easy
---

## Відповідь

Метод визначає дію над ресурсом: **GET** — читання (без тіла, ідемпотентний), **POST** — створення, **PUT** — повна заміна, **PATCH** — часткове оновлення, **DELETE** — видалення. У REST кожна сутність має URL, операція — відповідний метод.

## Приклад

```js
const productId = 42;

await fetch(`/api/products/${productId}`); // GET — отримати товар
await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Кросівки', price: 1999 }),
});
await fetch(`/api/products/${productId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ price: 1799 }), // лише ціна
});
await fetch(`/api/products/${productId}`, { method: 'DELETE' });
```

## Юз кейси

- GET `/api/products?page=2&limit=20` — пагінація без зміни даних на сервері
- POST `/api/orders` — створення замовлення з кошика
- PATCH замість PUT, коли змінюєш одне поле (наприклад, статус замовлення)

## Документація

- [HTTP-методи — MDN](https://developer.mozilla.org/uk/docs/Web/HTTP/Methods)
- [HTTP-статуси — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
