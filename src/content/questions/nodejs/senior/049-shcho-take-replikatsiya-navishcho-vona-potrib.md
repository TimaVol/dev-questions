---
title: "Що таке реплікація? Навіщо вона потрібна?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 49
difficulty: hard
---

## Відповідь

Реплікація — копіювання даних з primary (leader) на replica(s) (follower). Цілі: **масштабування читання** (SELECT на replicas), **висока доступність** (failover на replica), **геоблизькість** (читання з локальної replica), **backup/disaster recovery**.

**Async replication** — lag, можливі stale reads. **Sync** — сильніша консистентність, вища latency запису. PostgreSQL streaming replication; MySQL binlog; MongoDB replica set.

Застосунок: read/write split у connection pool; толерантність до replication lag у UI (eventual consistency) або read-your-writes routing на primary.

## Приклад

```js
const writePool = new Pool({ connectionString: process.env.DB_PRIMARY });
const readPool = new Pool({ connectionString: process.env.DB_REPLICA });

async function getOrders(userId) {
  return readPool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
}

async function createOrder(data) {
  return writePool.query('INSERT INTO orders ... RETURNING *', [data]);
}
```

## Юз кейси

- Failover при падінні primary → promote replica
- Аналітичні запити на read replica
- Зниження latency читання в multi-region

## Документація

- [PostgreSQL — Replication](https://www.postgresql.org/docs/current/high-availability.html)
