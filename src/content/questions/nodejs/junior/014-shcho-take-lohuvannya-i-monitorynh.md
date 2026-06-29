---
title: "Що таке логування і моніторинг?"
topic: nodejs
grade: junior
category: "Node.js"
order: 14
difficulty: easy
---

## Відповідь

**Логування** — фіксація подій застосунку (запити, помилки, бізнес-події) для дебагу та аудиту. У Node пишуть структуровані JSON-логи (`pino`, `winston`), рівні: debug/info/warn/error.

**Моніторинг** — збір метрик і health-check у реальному часі: CPU, пам'ять, latency, error rate. Інструменти: Prometheus + Grafana, Datadog, PM2, `process.memoryUsage()`.

Логи — для розбору інцидентів; метрики — для алертів і трендів.

## Приклад

```js
import pino from 'pino';
const log = pino();

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    log.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      ms: Date.now() - start,
    });
  });
  next();
});
```

## Юз кейси

- Correlation ID у логах для трейсингу запиту через мікросервіси
- Алерт при error rate > 1% за 5 хвилин
- Health endpoint `/health` для Kubernetes liveness probe

## Документація

- [Diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics)
