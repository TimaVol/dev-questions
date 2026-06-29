---
title: "Що означає «витік пам’яті» процеса? Як цьому запобігти?"
topic: nodejs
grade: middle
category: "Node.js"
order: 12
difficulty: medium
---

## Відповідь

**Витік пам'яті** — поступове зростання heap, коли об'єкти не збираються GC, бо на них залишаються посилання. У Node.js типові причини: необмежений in-memory кеш, EventEmitter listeners без `removeListener`, closures що захоплюють великі структури, timers без `clearInterval`.

Запобігання: LRU/TTL кеші, weak references, graceful shutdown з закриттям з'єднань, регулярні heap snapshots, alerts на зростання RSS.

## Приклад

```js
// Погано: масив росте без меж
const requests = [];
app.use((req, res, next) => {
  requests.push({ url: req.url, body: req.body }); // leak
  next();
});

// Добре: ring buffer або зовнішнє сховище
import LRU from 'lru-cache';
const recentRequests = new LRU({ max: 1000, ttl: 300_000 });
```

## Юз кейси

- API gateway з кешем відповідей — обов'язковий max size
- Long-lived WebSocket сервер — cleanup при disconnect
- Cron job що накопичує результати в масив замість stream

## Документація

- [Memory diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics/memory)
