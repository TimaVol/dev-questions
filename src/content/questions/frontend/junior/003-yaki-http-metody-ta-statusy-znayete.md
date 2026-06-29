---
title: "Які HTTP-методи та статуси знаєте?"
topic: frontend
grade: junior
category: "Загальні питання"
order: 3
difficulty: easy
---

## Відповідь

Методи: GET (читання), POST (створення), PUT/PATCH (оновлення), DELETE (видалення). Статуси: 2xx — успіх (200, 201), 4xx — помилка клієнта (400, 401, 403, 404), 5xx — помилка сервера (500).

## Приклад

```js
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Оля' }),
});
if (res.status === 201) console.log('Створено');
```

## Юз кейси

- Обробка помилок у fetch-запиті за status code
- Вибір правильного методу при проєктуванні REST API

## Документація

- [HTTP-методи — MDN](https://developer.mozilla.org/uk/docs/Web/HTTP/Methods)
- [HTTP-статуси — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
