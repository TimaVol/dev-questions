---
title: "Як використовувати події 'data', 'end', 'error', 'finish' у стримах Node.js?"
topic: nodejs
grade: middle
category: "Node.js"
order: 28
difficulty: medium
---

## Відповідь

У читальних потоках (readable streams):
- **`data`** — отримано фрагмент даних (переводить потік у режим flowing)
- **`end`** — більше даних немає
- **`error`** — помилка читання

У записувальних потоках (writable streams):
- **`finish`** — усі дані записані й скидані (flushed)
- **`error`** — помилка запису

Обов'язково слухати `error` — необроблена подія error завершує процес. Для асинхронного коду — `pipeline()` або `finished()` з `node:stream/promises`.

## Приклад

```js
import { createReadStream } from 'node:fs';

const rs = createReadStream('access.log', { encoding: 'utf8' });
let lineCount = 0;

rs.on('data', (chunk) => {
  lineCount += chunk.split('\n').length - 1;
});

rs.on('end', () => console.log(`Lines: ${lineCount}`));

rs.on('error', (err) => {
  console.error('Read failed:', err.message);
  process.exitCode = 1;
});
```

## Юз кейси

- Парсинг JSON-рядків з log stream
- Визначення завершення завантаження через `finish`
- Коректна обробка помилки → 500 + очищення тимчасового файлу

## Документація

- [Stream API — Node.js](https://nodejs.org/api/stream.html)
