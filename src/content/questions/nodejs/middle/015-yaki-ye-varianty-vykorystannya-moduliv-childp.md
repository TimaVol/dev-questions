---
title: "Які є варіанти використання модулів child_process, worker_threads і cluster?"
topic: nodejs
grade: middle
category: "Node.js"
order: 15
difficulty: medium
---

## Відповідь

| Модуль | Призначення |
|--------|-------------|
| **cluster** | Кілька процесів Node.js на різних ядрах для одного HTTP-сервера; master fork workers |
| **worker_threads** | Окремі V8 isolates в одному процесі; shared memory через SharedArrayBuffer |
| **child_process** | Запуск зовнішніх програм (ffmpeg, git) або окремого Node-скрипта |

`cluster` — throughput HTTP; `worker_threads` — CPU-bound JS без fork overhead; `child_process` — інтеграція з CLI tools.

## Приклад

```js
import cluster from 'node:cluster';
import os from 'node:os';

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) cluster.fork();
} else {
  import('./server.js'); // кожен worker слухає той самий port
}
```

## Юз кейси

- `cluster` — production Express API на 8-core VPS
- `worker_threads` — парсинг 10k JSON records паралельно
- `child_process.spawn('ffmpeg')` — конвертація відео при upload

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
- [child_process — Node.js](https://nodejs.org/api/child_process.html)
