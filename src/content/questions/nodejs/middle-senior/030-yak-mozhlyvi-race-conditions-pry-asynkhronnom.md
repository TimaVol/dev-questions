---
title: "Як можливі race conditions при асинхронному програмуванні?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 30
difficulty: medium
---

## Відповідь

Node single-thread JS — **немає паралельного виконання JS**, але race є через **переплетення** async операцій. Класика: read-modify-write без lock — два `await getBalance()` → обидва бачать 100 → обидва пишуть 90 замість 80. Check-then-act: `if (await exists(id))` → `create(id)` — між ними інший request встигає. Fix: unique constraint БД + retry, transactional `UPDATE ... WHERE`, mutex (async-mutex), idempotency keys, optimistic locking (колонка version). Не плутати з потоками — це **логічна конкурентність**.

## Приклад

```js
// Race: два паралельні decrement
async function withdraw(accountId, amount) {
  const balance = await db.getBalance(accountId); // both read 100
  await db.setBalance(accountId, balance - amount); // 90, not 80
}

// Fix: atomic SQL
await db.query(
  'UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND balance >= $1',
  [amount, accountId],
);
```

## Юз кейси

- Double-spend у wallet/payment flows
- Подвійна обробка webhook
- Cache stampede (кілька miss → кілька fetch)

## Документація

- [async/await — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
