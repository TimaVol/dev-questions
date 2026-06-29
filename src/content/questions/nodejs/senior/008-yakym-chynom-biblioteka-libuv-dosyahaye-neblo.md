---
title: "Яким чином бібліотека libuv досягає неблокуючого вводу і виводу?"
topic: nodejs
grade: senior
category: "Node.js"
order: 8
difficulty: hard
---

## Відповідь

libuv абстрагує OS-specific async I/O: на Linux — epoll, macOS — kqueue, Windows — IOCP. Сокети реєструються як non-blocking; коли дані не готові, операція повертає EAGAIN і callback ставиться в чергу poll phase.

Операції без native async API (sync fs, DNS lookup старий, crypto) делегуються в thread pool — worker threads виконують blocking call, результат повертається через callback у main thread. Це «неблокуючий» для JS, але обмежений розміром pool.

Accept connections, read/write sockets — truly async через kernel event notification. Write large buffers може partial write — libuv handles retry.

## Приклад

```js
import fs from 'node:fs';
import net from 'node:net';

// Async I/O — poll phase, не блокує JS
fs.readFile('/etc/hosts', (err, data) => console.log(data?.length));

// Thread pool — DNS, де немає async API в старих версіях
net.connect({ port: 80, host: 'example.com' }, () => console.log('connected'));
```

## Юз кейси

- Пояснення, чому `fs.readFile` OK, а `readFileSync` — ні під load
- Тюнінг UV_THREADPOOL_SIZE для crypto-heavy auth service
- Архітектура high-concurrency WebSocket gateway

## Документація

- [libuv — Design](http://docs.libuv.org/en/v1.0.0/design.html)
