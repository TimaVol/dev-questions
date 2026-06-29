---
title: "Що таке Socket? Яка різниця між Socket і long polling?"
topic: nodejs
grade: middle
category: "Networking & API"
order: 58
difficulty: medium
---

## Відповідь

**Socket (TCP/WebSocket)** — постійне двонаправлене з'єднання. WebSocket: HTTP upgrade → повнодуплексні фрейми. Низька затримка, ефективно для real-time.

**Long polling** — клієнт робить HTTP-запит, сервер тримає його відкритим до появи нових даних або таймауту, потім клієнт одразу надсилає новий запит. Імітує push поверх HTTP/1.1.

| | WebSocket | Long polling |
|---|-----------|--------------|
| З'єднання | Постійне | Повторні HTTP |
| Затримка | Низька | Вища (round trips) |
| Накладні витрати | Низькі на повідомлення | HTTP-заголовки щоразу |
| Масштабування | Sticky sessions / pub-sub | Простіше, майже безстанне |

Node.js: бібліотека `ws` або Socket.io (fallback на polling).

## Приклад

```js
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) client.send(data);
    });
  });
});

// Long polling alternative
app.get('/events', async (req, res) => {
  const event = await waitForEvent(req.query.channel, 30_000);
  res.json(event ?? { timeout: true });
});
```

## Юз кейси

- WebSocket: чат, живі сповіщення, торговий тікер
- Long polling: застарілі браузери, простий fallback для сповіщень
- Redis pub/sub + Socket.io для масштабування на кілька інстансів

## Документація

- [HTTP-повідомлення — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
- [WebSocket API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
