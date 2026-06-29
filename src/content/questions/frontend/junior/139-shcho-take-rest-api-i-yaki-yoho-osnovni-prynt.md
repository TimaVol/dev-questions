---
title: "Що таке REST API і які його основні принципи?"
topic: frontend
grade: junior
category: "Основи мережі та протоколи"
order: 139
difficulty: medium
---

## Відповідь

REST — стиль API: кожен ресурс має URL (`/users/1`), дія — HTTP-метод, сервер не зберігає стан клієнта між запитами (stateless), тіло — зазвичай JSON. GET/PUT/DELETE ідемпотентні: повторний запит дає той самий ефект.

## Приклад

```js
// Типовий CRUD для користувачів
const users = await fetch('/api/users').then(r => r.json());           // GET список
const user = await fetch('/api/users/42').then(r => r.json());       // GET один
await fetch('/api/users', { method: 'POST', body: JSON.stringify({ name: 'Оля' }) });
await fetch('/api/users/42', { method: 'DELETE' });
```

## Юз кейси

- Адмінка: CRUD для товарів через `/api/products` і `/api/products/:id`
- Пагінація й фільтри в query: `GET /api/orders?status=shipped&page=2`
- Версіонування API: `/api/v2/users` без ламання старих клієнтів

## Документація

- [HTTP-методи — MDN](https://developer.mozilla.org/uk/docs/Web/HTTP/Methods)
- [HTTP-статуси — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
