---
title: "Чи працювали ви з pino?"
topic: nodejs
grade: middle
category: "Node.js"
order: 31
difficulty: medium
---

## Відповідь

**Pino** — найшвидший structured logger для Node.js. Пише JSON logs з мінімальним overhead (async serialization через worker thread опційно).

Переваги над console.log:
- Structured fields для ELK/Loki/Grafana
- Log levels (trace/debug/info/warn/error/fatal)
- Child loggers з bound context (requestId, userId)
- `pino-http` middleware для auto request logging
- Redaction sensitive fields (password, token)

Production standard для Fastify (built-in) і Express.

## Приклад

```js
import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  redact: ['req.headers.authorization', 'body.password'],
});

app.use(pinoHttp({ logger }));

app.get('/orders/:id', async (req, res) => {
  req.log.info({ orderId: req.params.id }, 'fetching order');
  const order = await db.orders.findById(req.params.id);
  res.json(order);
});
```

## Юз кейси

- Correlation ID через child logger per request
- pino-pretty у dev, JSON у production
- Log-based alerting на error rate

## Документація

- [Pino — Documentation](https://getpino.io/#/docs/api)
