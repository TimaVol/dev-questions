---
title: "Скільки ядер процесора залучені при виконанні Node.js програми за замовчуванням?"
topic: nodejs
grade: middle
category: "Node.js"
order: 18
difficulty: easy
---

## Відповідь

За замовчуванням Node.js використовує **1 ядро** для основного JS-потоку (event loop). Додатково libuv thread pool займає **4 потоки** (налаштовується через `UV_THREADPOOL_SIZE`) для file I/O, DNS, crypto.

Щоб задіяти всі ядра для HTTP: `cluster` module або PM2 `instances: max`. Worker threads — окремі потоки для CPU tasks, але не для event loop.

## Приклад

```js
import os from 'node:os';
import { availableParallelism } from 'node:os';

console.log('CPU cores:', os.cpus().length);
console.log('Available parallelism:', availableParallelism());
// Default: 1 JS thread + 4 libuv pool threads
```

## Юз кейси

- Single-core API на dev — нормально для I/O-bound
- Production: `cluster.fork()` × `os.cpus().length`
- Heavy bcrypt: `UV_THREADPOOL_SIZE=16` або worker_threads

## Документація

- [os.cpus — Node.js](https://nodejs.org/api/os.html#oscpus)
- [UV_THREADPOOL_SIZE — libuv](http://docs.libuv.org/en/v1.0.0/threadpool.html)
