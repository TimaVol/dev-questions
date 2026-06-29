---
title: "Як зчитувати великі файли за допомогою Node.js?"
topic: nodejs
grade: junior
category: "Node.js"
order: 8
difficulty: easy
---

## Відповідь

Великі файли читають **потоками (streams)**, а не `readFileSync` — це не завантажує весь файл у пам'ять. `createReadStream` читає частинами (chunks); через `pipe` можна передати дані в інший потік (файл, HTTP-відповідь, трансформер). Для рядкової обробки зручний `readline` поверх readable stream.

## Приклад

```js
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const rl = createInterface({
  input: createReadStream('access.log', 'utf-8'),
  crlfDelay: Infinity,
});

for await (const line of rl) {
  if (line.includes('ERROR')) console.log(line);
}
```

## Юз кейси

- Парсинг гігабайтних лог-файлів без OOM
- Стрімінг CSV/JSON Lines у БД
- Віддача великих файлів клієнту через `readStream.pipe(res)`

## Документація

- [fs.createReadStream — Node.js](https://nodejs.org/api/fs.html#class-fscreatereadstream)
- [Stream API — Node.js](https://nodejs.org/api/stream.html)
