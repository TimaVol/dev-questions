---
title: "Які в Node.js головні компоненти?"
topic: nodejs
grade: junior
category: "Node.js"
order: 4
difficulty: easy
---

## Відповідь

Головні компоненти Node.js:

- **V8** — компілює та виконує JavaScript.
- **libuv** — event loop, thread pool для файлового I/O і DNS, кросплатформовий async I/O.
- **Core modules** — вбудовані модулі (`http`, `fs`, `path`, `crypto`, `stream` тощо).
- **C/C++ bindings** — міст між JS і системними викликами.
- **npm** — менеджер пакетів і реєстр залежностей.

## Приклад

```js
import http from 'node:http';   // core module
import fs from 'node:fs/promises'; // libuv + V8

const data = await fs.readFile('config.json', 'utf-8');
http.createServer((req, res) => res.end(data)).listen(3000);
```

## Юз кейси

- Розуміння, чому `fs.readFile` неблокуючий, а `fs.readFileSync` — блокує event loop
- Вибір між core modules і npm-пакетами
- Діагностика продуктивності через знання libuv thread pool (за замовчуванням 4 потоки)

## Документація

- [Node.js architecture — Node.js](https://nodejs.org/en/docs/guides/getting-started-guide)
