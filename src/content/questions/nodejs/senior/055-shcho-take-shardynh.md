---
title: "Що таке шардинг?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 55
difficulty: hard
---

## Відповідь

Шардинг — горизонтальне партиціонування: рядки розподілені між кількома інстансами БД за **shard key** (user_id, tenant_id, geo). Кожен shard тримає підмножину; разом — повний набір даних.

**Виклики**: дорогі cross-shard запити/joins; rebalancing при додаванні shards; гарячі shards (celebrity user); уникають розподілених транзакцій; глобальні унікальні ID (UUID, snowflake).

Стратегії: hash-based (рівномірний розподіл), range-based (time series), geo-based. Маршрутизація на рівні застосунку або proxy (Vitess, Citus, MongoDB sharded cluster).

Останній засіб після вичерпання vertical scale + replicas + cache.

## Приклад

```js
function getShardForUser(userId) {
  const shardIndex = hash(userId) % SHARD_COUNT;
  return shardPools[shardIndex];
}

async function getOrders(userId) {
  const pool = getShardForUser(userId);
  return pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
}
// Cross-user admin report — fan-out to all shards + merge
```

## Юз кейси

- Multi-tenant SaaS на 100M рядків на таблицю
- Зберігання user timeline масштабу Instagram/Twitter
- Планування незмінності shard key (user_id добре, country погано)

## Документація

- [PostgreSQL — Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html)
