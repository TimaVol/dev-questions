---
title: "Чим відрізняються fs.stat, fs.fstat, fs.lstat?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 7
difficulty: easy
---

## Відповідь

`fs.stat(path)` — metadata за **шляхом**; якщо path — symlink, stat повертає info про **target** (follow symlinks). `fs.lstat(path)` — metadata про **сам symlink** (не follow); `st.isSymbolicLink()` === true. `fs.fstat(fd)` — metadata вже **відкритого file descriptor**; без повторного path resolution, корисно після `open()` коли fd уже є. Для безпечного обходу дерева: `lstat` + явний `readlink`/`realpath` замість сліпого follow.

## Приклад

```js
import fs from 'node:fs/promises';

const link = await fs.lstat('config.link');
if (link.isSymbolicLink()) {
  const target = await fs.readlink('config.link');
  const real = await fs.stat('config.link'); // target metadata
}

const fd = await fs.open('data.log', 'r');
const meta = await fs.fstat(fd); // без повторного open/stat по path
await fd.close();
```

## Юз кейси

- Безпечний file watcher (не follow symlink loops)
- Atomic write через temp file + rename (stat fd після open)
- Build tools: розрізнення file vs directory vs symlink

## Документація

- [fs — Node.js](https://nodejs.org/api/fs.html)
