---
title: "Які сервіси можна використати для моніторингу і логування?"
topic: nodejs
grade: middle
category: "Node.js"
order: 7
difficulty: easy
---

## Відповідь

**Логування** (структуровані JSON-логи):
- **Pino** — швидкий, з низькими накладними витратами для Node.js
- **Winston** — гнучкий транспорт (файл, консоль, віддалений сервер)
- **ELK / OpenSearch** — централізований пошук логів
- **Loki + Grafana** — легка альтернатива ELK

**Моніторинг / APM**:
- **Prometheus + Grafana** — метрики (затримка, RPS, частота помилок)
- **Datadog / New Relic** — APM, розподілений трейсинг
- **OpenTelemetry** — незалежний від постачальника трейсинг і метрики
- **Sentry** — відстеження помилок зі stack trace

У продакшні: структуровані логи → агрегатор, метрики → дашборди, сповіщення за SLA.

## Приклад

```js
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      durationMs: Date.now() - start,
    });
  });
  next();
});
```

## Юз кейси

- Сповіщення, коли p99 затримка > 500 мс
- Correlation ID у логах для трейсингу запиту через мікросервіси
- Дашборд RPS і частоти 5xx під час деплою

## Документація

- [Diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics)
