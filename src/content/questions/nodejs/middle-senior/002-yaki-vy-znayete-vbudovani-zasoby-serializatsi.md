---
title: "Які ви знаєте вбудовані засоби серіалізації у Node.js, аналогічні до JSON, але для бінарної серіалізації?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 2
difficulty: hard
---

## Відповідь

`Buffer` — сирий бінарний контейнер; `buf.toJSON()`/`Buffer.from()` для JSON-представлення масиву байтів. `v8.serialize()` / `v8.deserialize()` — бінарна серіалізація JS-значень (з обмеженнями: без функцій, циклічних посилань). `structuredClone()` — клонування з підтримкою ArrayBuffer, Map, Date. Для IPC між workers — `postMessage` з transferable objects. MessagePack/Protobuf — зовнішні, але Node дає нативні примітиви для zero-copy і швидкого обміну між потоками.

## Приклад

```js
import v8 from 'node:v8';

const data = { ts: Date.now(), payload: Buffer.from('abc') };
const bin = v8.serialize(data);
const restored = v8.deserialize(bin);

// Transferable між workers — без копіювання
const sab = new SharedArrayBuffer(1024);
worker.postMessage({ sab }, [sab]);
```

## Юз кейси

- Кешування серіалізованих об'єктів на диск (`fs.writeFile`)
- Швидкий обмін даними між worker threads
- Snapshot/state persistence для long-running процесів

## Документація

- [v8.serialize — Node.js](https://nodejs.org/api/v8.html#v8serializevalue)
- [Buffer — Node.js](https://nodejs.org/api/buffer.html)
