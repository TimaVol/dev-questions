---
title: "Чому в JavaScript не рекомендують робити довгих обчислень у runtime?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 34
difficulty: medium
---

## Відповідь

Node.js — single-threaded event loop. Синхронний CPU-bound код (цикл на 5 секунд, JSON.parse 50MB, bcrypt sync) **блокує весь процес**: жоден HTTP-запит, timer чи I/O callback не виконається.

Наслідки: timeout від load balancer, health check fail, cascade failure у K8s.

Рішення: `worker_threads`, queue (Bull), винести в окремий microservice, або async/batched processing.

## Приклад

```js
// Погано: блокує event loop
app.get('/report/ingest', (req, res) => {
  const result = JSON.parse(req.body); // 100MB sync parse
  res.json({ ok: true });
});

// Добре: делегувати в worker
import { Worker } from 'node:worker_threads';

app.post('/ingest', (req, res) => {
  const worker = new Worker('./parse-worker.js', { workerData: req.body });
  worker.on('message', (result) => res.json(result));
});
```

## Юз кейси

- Image resize на upload → Bull job + sharp
- Report generation → background worker
- clinic.js doctor для detect event loop block

## Документація

- [Don't block the event loop — Node.js](https://nodejs.org/en/docs/guides/dont-block-the-event-loop)
