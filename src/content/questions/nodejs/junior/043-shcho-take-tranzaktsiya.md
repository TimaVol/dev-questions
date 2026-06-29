---
title: "Що таке транзакція?"
topic: nodejs
grade: junior
category: "Бази даних"
order: 43
difficulty: easy
---

## Відповідь

Транзакція — група SQL-операцій, що виконується як **одна атомарна одиниця**: або всі зміни фіксуються (`COMMIT`), або жодна (`ROLLBACK`). ACID: Atomicity, Consistency, Isolation, Durability. Потрібна, коли кілька записів мають бути узгодженими (переказ коштів, order + order_items).

## Приклад

```js
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [100, fromId]);
  await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [100, toId]);
  await client.query('COMMIT');
} catch (e) {
  await client.query('ROLLBACK');
  throw e;
} finally {
  client.release();
}
```

## Юз кейси

- Створення замовлення + списання складу в одній транзакції
- Ідемпотентний webhook: insert + update статусу атомарно
- Serializable isolation для критичних фінансових операцій

## Документація

- [PostgreSQL — Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
