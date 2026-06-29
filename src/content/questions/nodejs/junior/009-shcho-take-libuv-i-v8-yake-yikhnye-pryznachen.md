---
title: "Що таке libuv i v8? Яке їхнє призначення?"
topic: nodejs
grade: junior
category: "Node.js"
order: 9
difficulty: easy
---

## Відповідь

**V8** (Google) — JavaScript-рушій: парсить, компілює та виконує JS-код, керує пам'яттю (garbage collection).

**libuv** — C-бібліотека кросплатформового async I/O: реалізує event loop, thread pool (для `fs`, `crypto`, DNS), таймери та мережеві сокети на рівні OS (epoll, kqueue, IOCP).

Разом вони дають Node можливість виконувати JS і неблокуюче працювати з системою.

## Приклад

```js
import fs from 'node:fs';

// V8 виконує цей callback; libuv читає файл у thread pool
fs.readFile('data.json', (err, data) => {
  console.log(data.length); // JS у V8
});
```

## Юз кейси

- Діагностика: чому `crypto.pbkdf2` не блокує головний потік (libuv pool)
- Налаштування `UV_THREADPOOL_SIZE` для важкого файлового I/O
- Розуміння фаз event loop (timers → poll → check → close)

## Документація

- [libuv — Design overview](http://docs.libuv.org/en/v1.0.0/design.html)
- [V8 — Blog](https://v8.dev/blog)
