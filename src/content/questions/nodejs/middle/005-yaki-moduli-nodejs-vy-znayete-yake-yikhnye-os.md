---
title: "Які модулі Node.js ви знаєте? Яке їхнє основне призначення?"
topic: nodejs
grade: middle
category: "Node.js"
order: 5
difficulty: medium
---

## Відповідь

Ключові вбудовані модулі для backend:

- **`node:http` / `node:https`** — HTTP-сервер і клієнт
- **`node:fs`** — робота з файловою системою
- **`node:stream`** — потокова обробка даних
- **`node:crypto`** — хешування, шифрування, random bytes
- **`node:events`** — EventEmitter для pub/sub
- **`node:child_process` / `node:worker_threads`** — паралелізм
- **`node:cluster`** — multi-process на кількох ядрах
- **`node:path`, `node:os`, `node:process`** — системна інформація
- **`node:buffer`** — робота з бінарними даними

Префікс `node:` (Node 16+) явно позначає core module.

## Приклад

```js
import http from 'node:http';
import { createHash } from 'node:crypto';
import { EventEmitter } from 'node:events';

const bus = new EventEmitter();
const hash = createHash('sha256').update('secret').digest('hex');

http.createServer((req, res) => {
  bus.emit('request', req.url);
  res.end(hash);
}).listen(3000);
```

## Юз кейси

- `fs` + `stream` — парсинг великих лог-файлів
- `crypto` — підпис JWT або перевірка checksum
- `cluster` — zero-downtime deploy з кількома воркерами

## Документація

- [fs — Node.js](https://nodejs.org/api/fs.html)
- [HTTP module — Node.js](https://nodejs.org/api/http.html)
