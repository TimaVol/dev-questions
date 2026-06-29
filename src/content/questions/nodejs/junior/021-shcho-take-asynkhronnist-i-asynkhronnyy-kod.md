---
title: "Що таке асинхронність і асинхронний код?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 21
difficulty: easy
---

## Відповідь

Асинхронність — виконання операцій без блокування головного потоку: код запускає задачу (мережа, диск, таймер) і продовжує роботу; результат обробляється пізніше через callback, Promise або `async/await`. У Node це основа неблокуючого сервера. Синхронний код виконується рядок за рядком і блокує event loop.

## Приклад

```js
import fs from 'node:fs/promises';

// Асинхронно — event loop вільний
async function loadConfig() {
  const raw = await fs.readFile('config.json', 'utf-8');
  return JSON.parse(raw);
}

loadConfig().then((cfg) => console.log(cfg.port));
```

## Юз кейси

- Запити до БД і зовнішніх API в Express handler
- Паралельне завантаження даних через `Promise.all`
- Черги задач (BullMQ) для фонової обробки email

## Документація

- [async/await — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
