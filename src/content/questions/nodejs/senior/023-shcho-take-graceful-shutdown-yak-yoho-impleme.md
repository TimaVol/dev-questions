---
title: "Що таке graceful shutdown? Як його імплементувати?"
topic: nodejs
grade: senior
category: "Архітектура"
order: 23
difficulty: hard
---

## Відповідь

Graceful shutdown — коректне завершення при SIGTERM/SIGINT (завершення pod у K8s, деплой): припинити прийом нових з'єднань, дочекатися активних запитів, закрити пул БД/Redis/споживачів повідомлень, змусити запис логів, вийти з кодом 0.

K8s надсилає SIGTERM, чекає `terminationGracePeriodSeconds`, потім SIGKILL. Без graceful — обірвані транзакції, повторна обробка повідомлень після рестарту.

Кроки: `server.close()` → очікування активних запитів (timeout як fallback) → відключення пулу Prisma/pg → зупинка Kafka consumer → exit. `uncaughtException`/`unhandledRejection` обробляйте окремо — не завжди це graceful.

## Приклад

```js
let isShuttingDown = false;

process.on('SIGTERM', () => shutdown('SIGTERM'));

async function shutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log(`${signal} received`);

  server.close(() => console.log('HTTP closed'));
  await Promise.race([
    drainActiveRequests(),
    sleep(25_000), // < K8s grace period
  ]);
  await db.$disconnect();
  process.exit(0);
}
```

## Юз кейси

- Rolling deploy у Kubernetes без простою
- Rolling restart PM2 cluster без сплесків 502
- Rebalance consumer group без втрати повідомлень (спочатку commit offset'ів)

## Документація

- [Process signals — Node.js](https://nodejs.org/api/process.html#signal-events)
