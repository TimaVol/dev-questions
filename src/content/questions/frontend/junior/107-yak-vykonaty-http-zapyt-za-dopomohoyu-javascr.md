---
title: "Як виконати HTTP-запит за допомогою JavaScript?"
topic: frontend
grade: junior
category: "API браузера"
order: 107
difficulty: easy
---

## Відповідь

Сучасний спосіб — `fetch(url, options)`. Вказуй `method`, `headers`, `body`. Перевіряй `res.ok`, парси JSON через `res.json()`.

## Приклад

```js
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Оля' }),
});
const user = await res.json();
```

## Юз кейси

- CRUD-операції з REST API
- Завантаження даних для dashboard при mount

## Документація

- [Fetch API — MDN](https://developer.mozilla.org/uk/docs/Web/API/Fetch_API)
