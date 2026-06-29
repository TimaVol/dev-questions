---
title: "Що таке eventual consistency? Які ще бувають типи узгодженості?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 58
difficulty: hard
---

## Відповідь

**Eventual consistency** — replicas збігаються з часом без гарантії негайного однакового читання; записи поширюються async. Типово в розподілених кешах, DNS, CQRS read models, Dynamo-style БД.

Інші моделі: **Strong consistency** — read повертає останній write (linearizable); **Causal consistency** — зберігає порядок cause-effect; **Read-your-writes** — користувач бачить власні оновлення; **Monotonic reads** — без «подорожі в часі» назад; **Bounded staleness** — SLA максимального lag.

Застосунок має обробляти stale reads: номери версій, UI-стан «обробляється», вирішення конфліктів (LWW, merge, CRDT). CAP: під partition вибір між C або A.

## Приклад

```js
// User updates profile → read replica may lag
await writeDb.user.update({ where: { id }, data: { name: 'New' } });
// Immediate read from replica — might return old name
const user = await readDb.user.findUnique({ where: { id } });

// Fix: read-your-writes — route to primary after own write
const user = await writeDb.user.findUnique({ where: { id } });
```

## Юз кейси

- Оновлення ціни товару видиме в CDN/регіонах із затримкою
- Синхронізація кошика між пристроями — merge конфліктів
- SLA: «пошуковий індекс оновлюється протягом 30 секунд»

## Документація

- [CAP theorem — Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem)
