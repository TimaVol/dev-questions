---
title: "Що таке MessagePort і BroadcastChannel?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 6
difficulty: medium
---

## Відповідь

`MessagePort` — двосторонній канал для structured clone повідомлень між execution contexts (main thread ↔ worker, parent ↔ child process через `process.channel`). Підтримує transferable objects (ArrayBuffer без копіювання). `BroadcastChannel` — pub/sub на іменованому каналі: усі підписники same-origin (у Node — same process) отримують broadcast без point-to-point handoff. У Node 18+ обидва API доступні глобально (Web API compatibility). Відмінність: MessagePort — 1:1 після `postMessage` порту; BroadcastChannel — N:N через ім'я.

## Приклад

```js
import { BroadcastChannel } from 'node:worker_threads';
import { Worker } from 'node:worker_threads';

const bc = new BroadcastChannel('metrics');
bc.onmessage = (e) => console.log('main:', e.data);

const worker = new Worker(`
  const { BroadcastChannel } = require('node:worker_threads');
  const bc = new BroadcastChannel('metrics');
  bc.postMessage({ cpu: process.cpuUsage() });
`, { eval: true });
```

## Юз кейси

- Координація кеш-інвалідації між worker threads
- Cross-tab sync у Electron/renderer (BroadcastChannel)
- Передача SharedArrayBuffer між isolates

## Документація

- [worker_threads — Node.js](https://nodejs.org/api/worker_threads.html)
- [child_process — Node.js](https://nodejs.org/api/child_process.html)
