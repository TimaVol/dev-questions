---
title: "Як ви працювали з міграцією та покращенням сервісів в архітектурі мікросервісів?"
topic: nodejs
grade: senior
category: "Мікросервіси"
order: 35
difficulty: hard
---

## Відповідь

**Strangler Fig** — поступове відсіктання функціональності з monolith через proxy/gateway routing на новий сервіс. **Dual-write / dual-read** період для синхронізації даних між старим і новим сховищем — мінімізуйте тривалість.

**Feature flags** — canary rollout нового сервісу на % трафіку. **Міграція БД** — патерн expand/contract: додати колонку → backfill → перемкнути код → видалити старе.

План rollback обов'язковий. Версіонування контрактів (URL `/v2`, header negotiation). Еволюція event schema — зворотна сумісність (додавання optional полів).

Комунікація зі стейкхолдерами: інкрементальна цінність, не big-bang rewrite.

## Приклад

```js
// Gateway routes by feature flag
app.use('/billing', (req, res, next) => {
  const useNew = featureFlags.isEnabled('billing-v2', req.user.id);
  return proxy(useNew ? BILLING_V2_URL : BILLING_V1_URL)(req, res, next);
});
```

## Юз кейси

- Виділення модуля «notifications» з Node monolith
- Перейменування колонки PostgreSQL без простою (expand/contract)
- Міграція REST → gRPC без поломки mobile-клієнтів

## Документація

- [Prisma — Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Microservices — martinfowler.com](https://martinfowler.com/articles/microservices.html)
