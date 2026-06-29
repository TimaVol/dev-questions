---
title: "Що таке теорема CAP?"
topic: nodejs
grade: middle
category: "System Design"
order: 62
difficulty: hard
---

## Відповідь

**CAP theorem** (Brewer): distributed system під час **network partition** може гарантувати лише **2 з 3**:

- **C (Consistency)** — всі nodes бачать однакові дані одразу
- **A (Availability)** — кожен request отримує response (не error)
- **P (Partition tolerance)** — система працює при розриві мережі між nodes

На практиці P неминуча → вибір між CP і AP:
- **CP** — MongoDB (primary election), HBase — consistency over availability
- **AP** — Cassandra, DynamoDB — eventual consistency, high availability

Node.js сервіси часто: AP storage + application-level conflict resolution.

## Приклад

```js
// Eventual consistency: read may be stale after write to another region
async function updateUserProfile(userId, data) {
  await primaryDb.users.update(userId, data);
  // Replica lag 100-500ms — інший region може повернути old data
  await cache.del(`user:${userId}`); // invalidate local cache
  await eventBus.publish('user.updated', { userId }); // other regions invalidate
}
```

## Юз кейси

- Multi-region API: accept stale reads for profile, strong consistency for payments
- DynamoDB: tunable consistency (strong vs eventual read)
- Discuss trade-offs на system design interview

## Документація

- [CAP theorem — Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem)
