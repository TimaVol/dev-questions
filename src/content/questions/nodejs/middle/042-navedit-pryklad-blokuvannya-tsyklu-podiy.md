---
title: "Наведіть приклад блокування циклу подій."
topic: nodejs
grade: middle
category: "JavaScript"
order: 42
difficulty: medium
---

## Відповідь

Event loop блокується **синхронним CPU-bound кодом** у main thread. Поки він виконується — жодні I/O callbacks, timers, HTTP responses не обробляються.

Типові винуватці: великий `JSON.parse/stringify`, sync `bcrypt`, nested loops, sync `fs.readFileSync`, regex catastrophic backtracking.

## Приклад

```js
import http from 'node:http';

http.createServer((req, res) => {
  if (req.url === '/blocked') {
    // Блокує loop на ~3 секунди
    const end = Date.now() + 3000;
    while (Date.now() < end) {}
    res.end('done');
  } else {
    res.end('ok'); // цей endpoint теж не відповість поки /blocked обробляється
  }
}).listen(3000);
```

## Юз кейси

- clinic.js flamegraph для detect blocking
- Move bcrypt to worker_threads
- Never use *Sync methods in request handlers

## Документація

- [Event loop — Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)
