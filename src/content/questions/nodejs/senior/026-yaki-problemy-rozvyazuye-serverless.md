---
title: "Які проблеми розв’язує serverless?"
topic: nodejs
grade: senior
category: "Архітектура"
order: 26
difficulty: medium
---

## Відповідь

Serverless (AWS Lambda, Cloud Functions) вирішує: **ops overhead** — немає серверів для патчів; **auto-scaling** — від нуля до піку; **pay-per-use** — вартість простою ≈ 0; **event-driven glue** — завантаження в S3 → Lambda → обробка.

Компроміси для Node: **cold start** (100 мс–2 с+) — розмір bundle, VPC ENI; **ліміти виконання** (15 хв Lambda); **stateless** — немає in-memory кешу між викликами; **debugging/monitoring** складніше; vendor lock-in.

Добре: webhooks, cron, зміна розміру зображень, API з нерегулярним трафіком. Погано: довгоживучі WebSocket, стабільно високий RPS зі суворою latency, важкий старт (великий node_modules).

## Приклад

```js
// AWS Lambda handler
export const handler = async (event) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    await processOrder(body);
  }
  return { statusCode: 200 };
};
```

## Юз кейси

- Генерація звіту за розкладом раз на добу
- Подія S3 → генерація thumbnail
- API Gateway + Lambda для MVP без K8s cluster

## Документація

- [AWS Lambda — Serverless](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
