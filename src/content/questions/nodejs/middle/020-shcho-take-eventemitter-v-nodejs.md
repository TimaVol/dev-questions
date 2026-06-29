---
title: "Що таке EventEmitter в Node.js?"
topic: nodejs
grade: middle
category: "Node.js"
order: 20
difficulty: medium
---

## Відповідь

`EventEmitter` з `node:events` — базовий клас для event-driven архітектури в Node.js. Об'єкти емітують іменовані події; слухачі підписуються через `on`/`once`.

Core modules, що його використовують: `net.Socket`, `http.Server`, `fs.ReadStream`, `process`. Це основа неблокуючого I/O — коли дані готові, спрацьовує callback через emit.

`emitter.on('error', handler)` — обов'язково для streams, інакше unhandled 'error' crash процес.

## Приклад

```js
import { EventEmitter } from 'node:events';

const jobQueue = new EventEmitter();

jobQueue.on('job:done', ({ id, result }) => {
  console.log(`Job ${id} finished:`, result);
});

async function processJob(id, data) {
  const result = await heavyWork(data);
  jobQueue.emit('job:done', { id, result });
}
```

## Юз кейси

- Internal event bus між модулями без tight coupling
- Graceful shutdown: process.on('SIGTERM') → emit('shutdown')
- Custom stream-like API без повного Stream class

## Документація

- [Events — Node.js](https://nodejs.org/api/events.html)
