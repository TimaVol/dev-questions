---
title: "Що таке CRUD-операції і як вони реалізуються на практиці?"
topic: frontend
grade: junior
category: "Робота з бекендом"
order: 148
difficulty: easy
---

## Відповідь

CRUD: Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE). На фронті — форми для create/update, списки для read, кнопка delete з підтвердженням.

## Приклад

```js
const api = {
  list: () => fetch('/api/tasks').then(r => r.json()),
  create: (data) => fetch('/api/tasks', { method: 'POST', body: JSON.stringify(data) }),
  remove: (id) => fetch(`/api/tasks/${id}`, { method: 'DELETE' }),
};
```

## Юз кейси

- Todo-app — повний CRUD
- Admin panel для управління користувачами

## Документація

- [HTTP-методи — MDN](https://developer.mozilla.org/uk/docs/Web/HTTP/Methods)
- [HTTP-статуси — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
