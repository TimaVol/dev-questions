---
title: "Що таке race condition? Можете навести приклад?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 48
difficulty: medium
---

## Відповідь

Race condition — результат залежить від недетермінованого переплетення конкурентних операцій. У Node: async races (два запити читають той самий стан, перш ніж хтось записує). У БД: lost update без proper locking.

Пом'якшення: транзакції БД + ізоляція, row locks, unique constraints, idempotency keys, атомарні операції (`UPDATE SET x = x + 1`), розподілені locks (Redis Redlock — з обмеженнями).

Не плутати з data race у потоках — головний потік JS уникає shared mutable thread races, але async все одно гонить.

## Приклад

```js
// Race: two requests increment counter
async function incrementVisits(postId) {
  const post = await db.post.findUnique({ where: { id: postId } });
  await db.post.update({ where: { id: postId }, data: { visits: post.visits + 1 } });
}

// Fix: atomic SQL
await db.$executeRaw`UPDATE posts SET visits = visits + 1 WHERE id = ${postId}`;
```

## Юз кейси

- Купон «одноразовий» використаний двічі
- Інкремент bucket rate limiter під навантаженням
- Дедуп завантаження файлу за hash — два upload одночасно

## Документація

- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
