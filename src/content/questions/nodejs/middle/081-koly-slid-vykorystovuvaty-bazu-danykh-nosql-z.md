---
title: "Коли слід використовувати базу даних NoSQL замість реляційної бази даних?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 81
difficulty: medium
---

## Відповідь

NoSQL (MongoDB, DynamoDB, Cassandra) доречний коли:

- **Гнучка/еволюційна схема** — вкладені документи, різна структура на запис
- **Масштабний запис** — часові ряди, IoT, журнали (Cassandra)
- **Горизонтальне розділення** — вбудований sharding (DynamoDB)
- **Документна модель відповідає домену** — CMS, каталог продуктів з атрибутами
- **Подієва узгодженість прийнятна** — стрічки соцмереж, лічильники аналітики
- **Графові зв'язки** — Neo4j для соцмереж (спеціалізований NoSQL)

Не обирайте NoSQL коли: потрібні JOIN, ACID-транзакції на кількох таблицях, складні довільні запити, сувора референційна цілісність.

## Приклад

```js
// MongoDB — nested document natural fit
await db.collection('products').insertOne({
  sku: 'SHOE-001',
  name: 'Running Shoe',
  attributes: {
    size: [40, 41, 42],
    color: 'red',
    materials: ['mesh', 'rubber'],
  },
  reviews: [{ userId: '1', rating: 5, text: 'Great' }],
});
```

## Юз кейси

- MongoDB: гнучкий каталог продуктів
- Redis: кеш/сесії (key-value)
- DynamoDB: serverless API з непередбачуваним масштабом
- Postgres JSONB: гібрид, коли потрібні і SQL, і гнучкі поля

## Документація

- [PostgreSQL — SELECT](https://www.postgresql.org/docs/current/sql-select.html)
- [Redis — Documentation](https://redis.io/docs/latest/)
