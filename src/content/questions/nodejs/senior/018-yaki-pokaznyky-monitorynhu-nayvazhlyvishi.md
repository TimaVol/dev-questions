---
title: "Які показники мониторингу найважливіші?"
topic: nodejs
grade: senior
category: "Архітектура"
order: 18
difficulty: hard
---

## Відповідь

**Золоті сигнали** (Google SRE): Latency (p50/p95/p99), Traffic (RPS), Errors (частка 5xx, необроблені rejection), Saturation (CPU, затримка event loop, очікування в пулі БД).

**Специфічні для Node**: `event_loop_lag`, використаний heap vs ліміт, тривалість пауз GC, активні handles/requests, глибина черги thread pool libuv.

**Бізнес/SLO**: доступність %, витрата error budget, глибина черги, розмір DLQ, cache hit ratio. Алерти на симптоми (latency, яку бачить користувач), а не лише на причини (CPU 80%).

Розподілені системи: тривалість span у trace, поширення помилок між сервісами. Метод USE для ресурсів: Utilization, Saturation, Errors.

## Приклад

```js
import client from 'prom-client';

const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2],
});

app.use((req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method, route: req.route?.path });
  res.on('finish', () => end({ status: res.statusCode }));
  next();
});
```

## Юз кейси

- Визначення SLO: 99,9% запитів < 500 мс
- Інцидент: стрибок event loop lag → заблокований синхронний код
- Огляд потужності перед маркетинговою кампанією

## Документація

- [Diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics)
