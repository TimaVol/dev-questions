---
title: "Що таке libuv? Назвіть його складові."
topic: nodejs
grade: middle
category: "Node.js"
order: 8
difficulty: medium
---

## Відповідь

**libuv** — C-бібліотека, яка забезпечує event loop і асинхронний I/O для Node.js. Абстрагує різні OS API (epoll на Linux, kqueue на macOS, IOCP на Windows).

Складові:
- **Event loop** — фази: timers → pending → idle → poll → check → close
- **Thread pool** (default 4 потоки) — file I/O, DNS, crypto, де немає native async API
- **Handles** — TCP, UDP, timers, async work requests
- **Request** — async операції (fs.read, getaddrinfo)

Без libuv Node.js не міг би неблокуюче читати файли чи приймати TCP-з'єднання.

## Приклад

```js
// Цей виклик йде в libuv thread pool, не блокує JS-потік
import fs from 'node:fs';

fs.readFile('/var/log/app.log', (err, data) => {
  console.log('read done', data.length);
});

console.log('still running'); // виведеться першим
```

## Юз кейси

- Налаштування `UV_THREADPOOL_SIZE` для heavy crypto/fs workload
- Розуміння, чому DNS lookup може блокувати pool
- Debugging «повільного» event loop через sync fs у hot path

## Документація

- [libuv — Design overview](http://docs.libuv.org/en/v1.0.0/design.html)
