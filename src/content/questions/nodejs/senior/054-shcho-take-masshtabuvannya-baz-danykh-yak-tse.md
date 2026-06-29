---
title: "Що таке масштабування баз даних? Як це робити?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 54
difficulty: hard
---

## Відповідь

Стратегії масштабування БД:

- **Вертикальне** — потужніша машина (CPU, RAM, SSD); є стеля, ризик downtime.
- **Read replicas** — масштабування читання, HA; враховуйте replication lag.
- **Кешування** — Redis для гарячих даних, query cache; критична стратегія інвалідації.
- **Connection pooling** — PgBouncer; обмеження з'єднань на Node pod.
- **Шардинг** — партиціонування даних за shard key; cross-shard запити складні.
- **Архівування** — холодні дані в дешевше сховище.
- **Спеціалізовані сховища** — ES для пошуку, ClickHouse для аналітики.

Порядок: оптимізація запитів/індексів → кеш → read replicas → шардинг (останній засіб).

## Приклад

```js
// Cache-aside pattern
async function getProduct(id) {
  const cached = await redis.get(`product:${id}`);
  if (cached) return JSON.parse(cached);

  const product = await db.product.findUnique({ where: { id } });
  await redis.setex(`product:${id}`, 300, JSON.stringify(product));
  return product;
}
```

## Юз кейси

- План зростання трафіку в 10 разів для PostgreSQL primary
- PgBouncer, коли K8s pods × pool size вичерпують max_connections
- Коли шардинг, а коли достатньо read replicas

## Документація

- [PostgreSQL — Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html)
