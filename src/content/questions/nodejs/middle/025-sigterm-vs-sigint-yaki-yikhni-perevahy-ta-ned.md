---
title: "SIGTERM vs SIGINT: які їхні переваги та недоліки?"
topic: nodejs
grade: middle
category: "Node.js"
order: 25
difficulty: medium
---

## Відповідь

**SIGINT** (Ctrl+C) — інтерактивне переривання з терміналу. Зручно в dev, але не для production orchestration.

**SIGTERM** — polite shutdown request від OS/Kubernetes/Docker. Процес має завершити поточні запити, закрити connections, flush logs.

Best practice у Node.js:
```js
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
```

Graceful: `server.close()` → чекати active requests → `db.end()` → `process.exit(0)`. K8s дає `terminationGracePeriodSeconds` (default 30s), потім SIGKILL.

## Приклад

```js
function gracefulShutdown(signal) {
  console.log(`${signal} received, closing server`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 25_000).unref();
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

## Юз кейси

- Zero-downtime deploy у Kubernetes
- PM2 reload без dropped connections
- Dev: Ctrl+C з cleanup замість abrupt exit

## Документація

- [Process signals — Node.js](https://nodejs.org/api/process.html#signal-events)
