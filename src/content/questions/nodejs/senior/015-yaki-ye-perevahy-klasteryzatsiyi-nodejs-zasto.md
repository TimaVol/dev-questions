---
title: "Які є переваги кластеризації Node.js застосунку? Які проблеми можуть виникнути?"
topic: nodejs
grade: senior
category: "Архітектура"
order: 15
difficulty: medium
---

## Відповідь

**Переваги**: використання всіх CPU cores; ізоляція crash одного worker; throughput scaling для I/O-bound HTTP. Primary process може restart workers.

**Проблеми**: in-memory state не shared (sessions, rate limit counters, WebSocket rooms) — потрібен Redis/Sticky LB. Duplicate connections до DB (pool × workers). Shared nothing ускладнює debugging. `cluster` не балансує CPU-bound — worker може бути overloaded.

На production частіше K8s replicas замість in-process cluster — простіше ops, але ті самі shared-state проблеми.

## Приклад

```js
import cluster from 'node:cluster';

if (cluster.isPrimary) {
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died, restarting`);
    cluster.fork();
  });
  for (let i = 0; i < os.cpus().length; i++) cluster.fork();
} else {
  // Кожен worker — окремий DB pool (обмежте max connections!)
  startServer({ dbPoolSize: 5 });
}
```

## Юз кейси

- WebSocket chat — потрібен Redis pub/sub між workers
- Rate limiting без Redis — broken при cluster
- Capacity planning: workers × pool size < DB max_connections

## Документація

- [cluster — Node.js](https://nodejs.org/api/cluster.html)
- [child_process — Node.js](https://nodejs.org/api/child_process.html)
