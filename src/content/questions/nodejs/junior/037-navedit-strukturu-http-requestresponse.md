---
title: "Наведіть структуру HTTP request/response."
topic: nodejs
grade: junior
category: "JavaScript"
order: 37
difficulty: easy
---

## Відповідь

**HTTP Request:** стартовий рядок (`METHOD path HTTP/1.1`), заголовки (`Host`, `Content-Type`, `Authorization`), порожній рядок, опційне тіло (JSON, form).

**HTTP Response:** статус-рядок (`HTTP/1.1 200 OK`), заголовки (`Content-Type`, `Set-Cookie`), порожній рядок, тіло.

У Node: `req.method`, `req.url`, `req.headers`, `req` як stream для body; `res.statusCode`, `res.setHeader`, `res.end(body)`.

## Приклад

```http
POST /api/users HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"name":"Ann"}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"id":1,"name":"Ann"}
```

```js
app.post('/api/users', (req, res) => {
  res.status(201).json({ id: 1, name: req.body.name });
});
```

## Юз кейси

- Дебаг через `curl -v` або DevTools Network
- Проксі: читання `req.headers['x-forwarded-for']`
- Streaming response без повного body в пам'яті

## Документація

- [HTTP-повідомлення — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
