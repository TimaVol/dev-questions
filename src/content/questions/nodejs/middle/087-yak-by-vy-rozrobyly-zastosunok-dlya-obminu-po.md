---
title: "Як би ви розробили застосунок для обміну повідомленнями на кшталт WhatsApp або Facebook Messenger? Програми для обміну повідомленнями в режимі реального часу є звичайним окремим продуктом чи вбудованою функцією великих систем?"
topic: nodejs
grade: middle
category: "System Design"
order: 87
difficulty: hard
---

## Відповідь

**Архітектура чату (Node.js):**

- **WebSocket gateway** — Socket.io/ws, sticky sessions або Redis adapter для кількох інстансів
- **Message service** — REST для історії, WS для доставки в реальному часі
- **Черга повідомлень** — Kafka/RabbitMQ для async: push-сповіщення, збереження, fan-out
- **База даних** — Cassandra/DynamoDB для повідомлень (write-heavy, time-ordered); Postgres для користувачів/груп
- **Присутність** — Redis TTL keys (online/offline)
- **Медіа** — S3 + CDN, метадані в БД
- **Push** — FCM/APNs для офлайн-користувачів

**Продукт vs функція:** окремий (WhatsApp, Telegram) — основний продукт; вбудований (Slack у командному інструменті, чат у маркетплейсі) — функція зі спільною інфраструктурою auth/сповіщень.

## Приклад

```js
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const io = new Server(httpServer);
const pub = createClient({ url: process.env.REDIS_URL });
const sub = pub.duplicate();
io.adapter(createAdapter(pub, sub));

io.on('connection', (socket) => {
  socket.on('join', (roomId) => socket.join(roomId));

  socket.on('message', async ({ roomId, text }) => {
    const msg = await messageService.save({ roomId, userId: socket.userId, text });
    io.to(roomId).emit('message', msg);
    await pushQueue.add('notify-offline', { roomId, msg });
  });
});
```

## Юз кейси

- Redis pub/sub для ретрансляції повідомлень між серверами
- Підтвердження прочитання через окремі легкі події
- End-to-end шифрування — на клієнті, сервер зберігає лише ciphertext

## Документація

- [WebSocket API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
