---
title: "Як налаштувати кешування?"
topic: nodejs
grade: middle
category: "Node.js"
order: 14
difficulty: medium
---

## Відповідь

Рівні кешування в Node.js API:

- **In-memory** (LRU/Map) — швидко, але не shared між інстансами
- **Redis** — distributed cache, TTL, pub/sub invalidation
- **HTTP cache headers** — `Cache-Control`, `ETag` для CDN/браузера
- **Application-level** — кеш результатів DB-запитів, computed values

Ключові рішення: TTL, invalidation strategy (write-through, write-behind), cache key design, що робити при cache miss (stampede protection через lock/singleflight).

## Приклад

```js
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function getUser(id) {
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);

  const user = await db.users.findById(id);
  await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 300);
  return user;
}
```

## Юз кейси

- Кеш каталогу товарів з invalidation при оновленні
- Redis для rate limiting (sliding window)
- `ETag` для умовних GET `/api/articles/:slug`

## Документація

- [HTTP caching — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
