---
title: "Як налаштувати логування і моніторинг? Які найкращі практики ви знаєте?"
topic: nodejs
grade: senior
category: "Node.js"
order: 12
difficulty: medium
---

## Відповідь

Структуроване логування (JSON): pino/winston з полями `level`, `msg`, `requestId`, `service`, `durationMs`. Кореляція через AsyncLocalStorage — один trace id на весь ланцюжок запиту. Рівні логів: error для дій, що потребують реакції, warn для деградованого стану, info для бізнес-подій; debug — лише в dev.

Метрики: Prometheus (prom-client) — метод RED (Rate, Errors, Duration), метрики процесу (затримка event loop, heap). Трейсинг: OpenTelemetry → Jaeger/Tempo. Помилки: Sentry з source maps.

Health checks: `/health` (процес працює) vs `/ready` (DB/Redis доступні). Алерти на швидкість витрати error budget (SLO burn rate), а не на кожен 500. Twelve-Factor: логи — потік у stdout, агрегатор (Loki/ELK) збирає.

## Приклад

```js
import pino from 'pino';
import { AsyncLocalStorage } from 'node:async_hooks';

const als = new AsyncLocalStorage();
const logger = pino({
  mixin: () => ({ requestId: als.getStore()?.requestId }),
});

app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] ?? crypto.randomUUID();
  als.run({ requestId }, () => {
    const start = Date.now();
    res.on('finish', () =>
      logger.info({ status: res.statusCode, durationMs: Date.now() - start }, 'request')
    );
    next();
  });
});
```

## Юз кейси

- Налаштування стеку observability для Node.js-деплою в Kubernetes
- RCA інциденту в продакшені через trace і корельовані логи
- SLO-дашборд для p99 latency API та рівня помилок

## Документація

- [Diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics)
