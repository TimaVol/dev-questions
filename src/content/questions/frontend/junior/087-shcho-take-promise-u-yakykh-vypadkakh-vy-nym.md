---
title: "Що таке Promise? У яких випадках ви ним користуєтеся?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 87
difficulty: easy
---

## Відповідь

Promise — об'єкт для асинхронної операції зі станами pending/fulfilled/rejected. `fetch`, `setTimeout` обгортають у Promise. Обробка: `.then()`, `.catch()` або `async/await`.

## Приклад

```js
async function loadUser(id) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}
```

## Юз кейси

- HTTP-запити через fetch
- `Promise.all([fetchUsers(), fetchPosts()])` — паралельне завантаження

## Документація

- [Promise — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Promise)
