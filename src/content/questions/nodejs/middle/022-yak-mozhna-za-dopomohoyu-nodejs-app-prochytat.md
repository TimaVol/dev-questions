---
title: "Як можна за допомогою Node.js app читати файл з логами із файлової системи? Як прочитати файл, який займає понад 300 мегабайтів?"
topic: nodejs
grade: middle
category: "Node.js"
order: 22
difficulty: medium
---

## Відповідь

Малий файл (< few MB): `fs.readFile` або `fs.promises.readFile`.

Великий файл (300MB+): **streaming** — не завантажувати в RAM. `createReadStream` + `readline` для рядок-за-рядком, або `pipeline` для transform/filter.

Для пошуку ERROR у логах: stream + filter, запис у новий файл через `createWriteStream`. Memory footprint — кілька KB замість 300MB.

## Приклад

```js
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

async function findErrors(logPath) {
  const rl = createInterface({
    input: createReadStream(logPath, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (line.includes('ERROR')) console.log(line);
  }
}
```

## Юз кейси

- Log rotation analysis без OOM
- ETL: stream CSV → transform → Postgres COPY
- Tail -f equivalent через fs.watch + stream

## Документація

- [fs — Node.js](https://nodejs.org/api/fs.html)
