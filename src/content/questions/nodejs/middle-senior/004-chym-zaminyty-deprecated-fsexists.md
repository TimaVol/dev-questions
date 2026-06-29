---
title: "Чим замінити deprecated: fs.exists?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 4
difficulty: hard
---

## Відповідь

`fs.exists()` deprecated через TOCTOU (time-of-check-time-of-use): між перевіркою і читанням файл може зникнути або з'явитися. Замість «перевірити, потім читати» — одразу виконати операцію і обробити `ENOENT`. Варіанти: `fs.promises.access(path, fs.constants.F_OK)` для явної перевірки прав; `fs.promises.stat()` / `open()` / `readFile()` з catch на `err.code === 'ENOENT'`. Для директорій — `stat` + `isDirectory()`.

## Приклад

```js
import fs from 'node:fs/promises';

async function loadConfig(path) {
  try {
    return JSON.parse(await fs.readFile(path, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return createDefaultConfig(path);
    throw err;
  }
}
```

## Юз кейси

- Bootstrap конфігурації при старті сервісу
- Idempotent deploy-скрипти (mkdir якщо немає)
- Уникнення race condition у multi-process середовищі

## Документація

- [fs — Node.js](https://nodejs.org/api/fs.html)
