---
title: "Що таке Promises?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 36
difficulty: easy
---

## Відповідь

**Promise** — об'єкт, що представляє результат асинхронної операції. Стани: **pending** → **fulfilled** (value) або **rejected** (reason).

API: `.then(onFulfilled, onRejected)`, `.catch()`, `.finally()`. `async/await` — syntactic sugar над Promises.

У backend: DB queries, HTTP calls, file I/O — все через Promises. `Promise.all` для parallel, `Promise.allSettled` коли потрібні всі результати.

Unhandled rejection → `unhandledRejection` event → crash у strict production setups.

## Приклад

```js
async function transferFunds(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, fromId]);
    await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, toId]);
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

- Parallel fetch user + permissions + settings
- Transaction wrapper з rollback
- Timeout через Promise.race + AbortSignal

## Документація

- [Promise — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Promise)
