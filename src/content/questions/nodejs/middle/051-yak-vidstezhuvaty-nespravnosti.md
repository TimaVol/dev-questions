---
title: "Як відстежувати несправності?"
topic: nodejs
grade: middle
category: "Деплоймент і процес розробки"
order: 51
difficulty: medium
---

## Відповідь

Тріада спостережуваності (observability) для Node.js backend:

**Метрики** — Prometheus: RPS, гістограма затримки (p50/p99), частота помилок, затримка циклу подій, використання heap.

**Логи** — структурований JSON (Pino) → Loki/ELK; ідентифікатор кореляції через усі сервіси.

**Трейси** — OpenTelemetry/Jaeger: span на HTTP-виклик, запит до БД, зовнішнє API.

**Сповіщення** — сповіщення Grafana при порушенні SLO (частота помилок > 1%, p99 > 500 мс).

**Відстеження помилок** — Sentry для stack traces і breadcrumbs.

## Приклад

```js
import { trace } from '@opentelemetry/api';

app.get('/orders/:id', async (req, res) => {
  const span = trace.getActiveSpan();
  span?.setAttribute('order.id', req.params.id);

  const start = Date.now();
  try {
    const order = await db.orders.findById(req.params.id);
    metrics.orderFetchDuration.observe(Date.now() - start);
    res.json(order);
  } catch (err) {
    span?.recordException(err);
    Sentry.captureException(err);
    res.status(500).json({ error: 'Internal error' });
  }
});
```

## Юз кейси

- Сповіщення: сплеск 5xx після деплою → відкат
- Дашборд: затримка event loop > 100 мс
- Трейсинг повільного запиту через 5 мікросервісів

## Документація

- [Diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics)
