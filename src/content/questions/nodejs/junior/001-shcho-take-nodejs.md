---
title: "Що таке Node.js?"
topic: nodejs
grade: junior
category: "Node.js"
order: 1
difficulty: easy
---

## Відповідь

Node.js — це середовище виконання JavaScript поза браузером, побудоване на рушії V8 (Chrome). Воно додає API для мережі, файлової системи, процесів і потоків, тому JS можна використовувати для серверів, CLI та інструментів збірки. Node працює в одному головному потоці з неблокуючим I/O через event loop.

## Приклад

```js
import { createServer } from 'node:http';

createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Привіт з Node.js');
}).listen(3000);
```

## Юз кейси

- REST/GraphQL API для веб- і мобільних застосунків
- CLI-утиліти (`npm`, `eslint`, `vite`)
- Real-time сервіси (чати, нотифікації через WebSocket)

## Документація

- [About Node.js — Node.js](https://nodejs.org/en/about/)
