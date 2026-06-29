---
title: "Наведіть приклади протікання абстракцій у типових системах на базі Node.js."
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 35
difficulty: hard
---

## Відповідь

Leaky abstraction — деталі нижнього рівня «просочуються» у верхній шар. Приклади: **ORM** — N+1 queries, raw SQL escape hatches, витік isolation транзакцій; **Promises** — unhandled rejection, сюрпризи порядку microtask; **fs abstraction** — EMFILE, різниці шляхів між платформами (Windows vs POSIX); **HTTP client** — вичерпання connection pool, логіка retry ECONNRESET у бізнес-коді; **Redis cache** — stampede, stale reads TTL видимі в domain; **Streams** — backpressure падає на consumer. Добра абстракція: збої виражаються domain errors, не errno.

## Приклад

```js
// Leak: business service catches ECONNRESET
async function getUser(id) {
  try {
    return await userRepo.find(id);
  } catch (err) {
    if (err.code === 'ECONNRESET') await sleep(100); // TCP detail in domain
    throw err;
  }
}

// Better: repository wraps infra errors
class UserRepository {
  async find(id) {
    try {
      return await this.db.query(/*...*/);
    } catch (err) {
      throw new InfrastructureError('db unavailable', { cause: err });
    }
  }
}
```

## Юз кейси

- Code review: infra concerns у controllers
- Міграція ORM (різниця поведінки Sequelize → Prisma)
- Дебаг «works on my machine» проблем зі шляхами

## Документація

- [Leaky abstraction — Wikipedia](https://en.wikipedia.org/wiki/Leaky_abstraction)
- [The Law of Leaky Abstractions — Joel on Software](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/)
