---
title: "Які рівні ізоляції транзакцій бувають? Плюси і мінуси?"
topic: nodejs
grade: middle
category: "Бази даних"
order: 76
difficulty: hard
---

## Відповідь

Рівні ізоляції SQL (ANSI):

| Рівень | Dirty read | Non-repeatable read | Phantom read |
|-------|------------|---------------------|--------------|
| **READ UNCOMMITTED** | ✓ | ✓ | ✓ |
| **READ COMMITTED** | ✗ | ✓ | ✓ |
| **REPEATABLE READ** | ✗ | ✗ | ✓* |
| **SERIALIZABLE** | ✗ | ✗ | ✗ |

Postgres за замовчуванням: READ COMMITTED. MySQL InnoDB: REPEATABLE READ.

Компроміси: вищий рівень → менше аномалій, більше блокувань/повторів, нижча пропускна здатність.

У Node.js: `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE` перед BEGIN для критичних секцій.

## Приклад

```js
async function reserveSeat(seatId, userId) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN ISOLATION LEVEL SERIALIZABLE');
    const { rows } = await client.query(
      'SELECT * FROM seats WHERE id = $1 FOR UPDATE',
      [seatId],
    );
    if (rows[0].reserved) throw new Error('Seat taken');
    await client.query('UPDATE seats SET reserved_by = $1 WHERE id = $2', [userId, seatId]);
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

- READ COMMITTED — за замовчуванням для більшості API
- SERIALIZABLE — бронювання місць, зменшення запасів
- Оптимістичне блокування (колонка version) замість SERIALIZABLE

## Документація

- [PostgreSQL — Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
