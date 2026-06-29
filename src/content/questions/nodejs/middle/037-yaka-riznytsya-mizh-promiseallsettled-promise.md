---
title: "Яка різниця між Promise.allSettled, Promise.race і Promise.any?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 37
difficulty: medium
---

## Відповідь

| Метод | Поведінка |
|-------|-----------|
| **Promise.all** | Чекає всі; fail fast на першому reject |
| **Promise.allSettled** | Чекає всі; повертає `{status, value/reason}` для кожного |
| **Promise.race** | Перший settled (fulfilled або rejected) |
| **Promise.any** | Перший fulfilled; AggregateError якщо всі rejected |

`allSettled` — bulk operations де частина може fail. `race` — timeout pattern. `any` — fallback mirrors (CDN, API endpoints).

## Приклад

```js
const results = await Promise.allSettled([
  paymentGateway.charge(order),
  analytics.track(order),
  emailService.sendReceipt(order),
]);
const failed = results.filter((r) => r.status === 'rejected');
if (failed.length) logger.warn({ failed }, 'non-critical tasks failed');

const fastest = await Promise.race([
  fetch('https://api-primary.example.com/data'),
  fetch('https://api-backup.example.com/data'),
]);
```

## Юз кейси

- Bulk delete: allSettled → report which IDs failed
- Request timeout: race(fetch, sleep(5000))
- Multi-region DNS: Promise.any across endpoints

## Документація

- [Promise — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Promise)
