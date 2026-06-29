---
title: "Для яких завдань Node.js не підходить?"
topic: nodejs
grade: junior
category: "Node.js"
order: 3
difficulty: easy
---

## Відповідь

Node.js погано підходить для CPU-bound задач: відео/аудіо кодування, складні математичні розрахунки, ML-інференс, важка криптографія в головному потоці. Також не ідеальний для систем з жорсткими real-time вимогами до детермінізму (embedded, HFT) або коли потрібна нативна інтеграція з OS на рівні C++/Rust без обгорток.

## Приклад

```js
// Це заблокує event loop на секунди
app.get('/hash', (req, res) => {
  let hash = 0;
  for (let i = 0; i < 1e9; i++) hash = (hash + i) % 1e6;
  res.json({ hash });
});

// Краще: винести в worker thread
import { Worker } from 'node:worker_threads';
const worker = new Worker('./heavy-task.js');
```

## Юз кейси

- Обробка зображень/відео — краще окремий сервіс на Go/Rust або worker threads
- Desktop-додатки з GUI — Electron можливий, але нативні фреймворки часто ефективніші
- Системне програмування (драйвери, ядро) — C/Rust, не Node

## Документація

- [About Node.js — Node.js](https://nodejs.org/en/about/)
