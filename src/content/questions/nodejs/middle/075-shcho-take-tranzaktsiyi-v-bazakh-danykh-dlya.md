---
title: "Що таке транзакції в базах даних? Для чого вони потрібні?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 75
difficulty: medium
---

## Відповідь

**Transaction** — група SQL операцій, що виконуються як **atomic unit**: або всі commit, або всі rollback.

Потрібні коли кілька writes мають бути consistent:
- Переказ грошей: debit + credit
- Створення order + decrement inventory
- Delete user + cascade related records

ACID гарантії забезпечують DB engine. У Node.js: `BEGIN` → queries → `COMMIT`/`ROLLBACK` через single client connection.

## Приклад

```js
async function transfer(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND balance >= $1',
      [amount, fromId],
    );
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId],
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
```

## Юз кейси

- Order + payment + inventory в одній transaction
- Idempotent webhook processing з transaction lock
- Serializable isolation для race-prone counters

## Документація

- [PostgreSQL — Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
