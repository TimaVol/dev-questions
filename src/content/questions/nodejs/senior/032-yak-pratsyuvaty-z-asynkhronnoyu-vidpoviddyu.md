---
title: "Як працювати з асинхронною відповіддю?"
topic: nodejs
grade: senior
category: "JavaScript"
order: 32
difficulty: medium
---

## Відповідь

Патерни асинхронної відповіді в Node API:

- **Синхронний HTTP 200** — `await` завершення, повернення JSON (найпростіше).
- **202 Accepted** — операція в черзі, повертаємо jobId, клієнт опитує або отримує webhook callback.
- **SSE/WebSocket** — streaming прогресу для довгих операцій.
- **Server push** — notification service після завершення.

Критично: не тримати HTTP-з'єднання відкритим довше за timeout проксі (60 с). Обробка помилок — reject → централізований error middleware з узгодженою JSON-формою. Паралельні незалежні виклики — `Promise.all`; частковий збій — `Promise.allSettled`.

## Приклад

```js
app.post('/reports', async (req, res) => {
  const job = await queue.add('generate-report', req.body);
  res.status(202).json({ jobId: job.id, statusUrl: `/jobs/${job.id}` });
});

app.get('/jobs/:id', async (req, res) => {
  const job = await queue.getJob(req.params.id);
  res.json({ status: job.status, result: job.returnvalue });
});
```

## Юз кейси

- Bulk export API без gateway timeout
- Обробка платежів з асинхронним підтвердженням через webhook
- Поєднання викликів БД і зовнішнього API паралельним fetch

## Документація

- [async/await — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
