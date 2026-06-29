---
title: "Назвіть переваги Node.js, якщо порівнювати з іншими технологіями для розробки серверних застосунків."
topic: nodejs
grade: middle
category: "Node.js"
order: 1
difficulty: easy
---

## Відповідь

Node.js — середовище виконання JavaScript на рушії V8 поза браузером. Головна перевага — неблокуюча модель I/O через event loop і libuv: один процес обробляє тисячі одночасних з'єднань без створення потоку на кожен запит.

Порівняно з традиційними багатопотоковими серверами (Java, Go): менше накладних витрат на контекстне перемикання, швидший старт, єдиний стек JS на фронті й бекенді. Добре підходить для REST/GraphQL API, проксі, streaming, real-time (WebSocket), черг повідомлень.

Обмеження: CPU-bound задачі (шифрування, відеокодек, складні обчислення) блокують event loop — для них потрібні worker threads або окремі сервіси.

## Приклад

```js
import http from 'node:http';

const server = http.createServer(async (req, res) => {
  const user = await db.findById(req.params.id); // async I/O, не блокує loop
  res.end(JSON.stringify(user));
});

server.listen(3000);
```

## Юз кейси

- BFF/API-шар для SPA або мобільного клієнта
- Streaming-завантаження великих файлів або логів
- Real-time чат, нотифікації через Socket.io

## Документація

- [About Node.js — Node.js](https://nodejs.org/en/about/)
- [Blocking vs non-blocking — Node.js](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking)
