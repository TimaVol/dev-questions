---
title: "Назвіть основні HTTP-методи RESTful або CRUD застосунків."
topic: nodejs
grade: junior
category: "WEB"
order: 48
difficulty: easy
---

## Відповідь

Мапінг CRUD на HTTP:

| Операція | Метод | Приклад |
|----------|-------|---------|
| Read (список/один) | GET | `GET /users`, `GET /users/1` |
| Create | POST | `POST /users` |
| Replace | PUT | `PUT /users/1` |
| Partial update | PATCH | `PATCH /users/1` |
| Delete | DELETE | `DELETE /users/1` |

Статуси: 200 OK, 201 Created, 204 No Content, 400/404/409, 500.

## Приклад

```js
router.post('/users', async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).location(`/users/${user.id}`).json(user);
});

router.delete('/users/:id', async (req, res) => {
  await deleteUser(req.params.id);
  res.sendStatus(204);
});
```

## Юз кейси

- Проєктування публічного REST API
- Idempotent PUT vs частковий PATCH
- Правильні статуси для клієнтської обробки помилок

## Документація

- [HTTP-методи — MDN](https://developer.mozilla.org/uk/docs/Web/HTTP/Methods)
- [HTTP-статуси — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
