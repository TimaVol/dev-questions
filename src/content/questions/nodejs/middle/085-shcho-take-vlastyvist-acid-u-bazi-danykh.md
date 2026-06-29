---
title: "Що таке властивість ACID у базі даних?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 85
difficulty: medium
---

## Відповідь

**ACID** — чотири гарантії надійних транзакцій:

- **Atomicity (атомарність)** — все або нічого; частковий збій → повний відкат
- **Consistency (узгодженість)** — транзакція переводить БД з одного валідного стану в інший (обмеження дотримуються)
- **Isolation (ізоляція)** — паралельні транзакції не заважають одна одній (рівні ізоляції)
- **Durability (стійкість)** — зафіксовані дані переживають збій (WAL/redo log)

Критично для Node.js backend: платежі, запаси, подвійний запис. NoSQL часто жертвує ACID заради масштабу (BASE: Basically Available, Soft state, Eventual consistency).

## Приклад

```js
// Atomicity: both updates or neither
async function purchase(userId, productId) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE inventory SET qty = qty - 1 WHERE product_id = $1 AND qty > 0',
      [productId],
    );
    await client.query(
      'INSERT INTO purchases (user_id, product_id) VALUES ($1, $2)',
      [userId, productId],
    );
    await client.query('COMMIT'); // Durability: persisted to WAL
  } catch (err) {
    await client.query('ROLLBACK'); // Atomicity: undo all
    throw err;
  } finally {
    client.release();
  }
}
```

## Юз кейси

- Банківський переказ — ACID обов'язковий
- Замовлення + зменшення запасів — одна транзакція
- Eventual consistency прийнятна для лічильників переглядів → можна без суворого ACID

## Документація

- [PostgreSQL — Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
