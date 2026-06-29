---
title: "Яким чином Node.js сервер здатен обробляти одночасно багато паралельних запитів від клієнтів, маючи лише один thread?"
topic: nodejs
grade: junior
category: "Node.js"
order: 5
difficulty: easy
---

## Відповідь

Node.js використовує **неблокуючий I/O** і **event loop**. Коли запит чекає на диск, мережу або БД, потік не простоює — він обробляє інші запити. Після завершення I/O callback потрапляє в чергу і виконується, коли event loop до нього дійде. Тому один потік ефективно обслуговує тисячі одночасних з'єднань, якщо робота переважно I/O-bound.

## Приклад

```js
import { createServer } from 'node:http';

createServer(async (req, res) => {
  // Поки await чекає на БД, event loop обробляє інші запити
  const user = await db.findUser(req.url);
  res.end(JSON.stringify(user));
}).listen(3000);
```

## Юз кейси

- API-сервер з тисячами одночасних HTTP-з'єднань
- WebSocket-шлюз для real-time повідомлень
- Проксі-сервер, що перенаправляє запити до мікросервісів

## Документація

- [Blocking vs non-blocking — Node.js](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking)
