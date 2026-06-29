---
title: "Як стежити за змінами файлів і директорій на диску? Які з цим можуть виникати проблеми?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 10
difficulty: medium
---

## Відповідь

Вбудовано: `fs.watch(path, { recursive })` — на рівні ОС (inotify/FSEvents/ReadDirectoryChangesW); `fs.watchFile(path, interval)` — polling stat. Крос-платформено надійніше — `chokidar` (debounce, glob, atomic writes). Проблеми: **дубльовані події** (збереження редактором = unlink+create); **не recursive** на Linux без `{ recursive: true }`; **EMFILE** при watch тисяч файлів; **rename vs change** не розрізняється; watch на symlink — platform-specific; race hot reload з partial writes. Рішення: debounce, дочекатися завершення запису (atomic rename), обмежити scope watch.

## Приклад

```js
import fs from 'node:fs';

const watcher = fs.watch('src', { recursive: true }, (event, filename) => {
  if (!filename?.endsWith('.ts')) return;
  debounceReload(filename); // не reload на кожен chunk write
});

watcher.on('error', (err) => {
  if (err.code === 'EMFILE') console.error('too many watches');
});
```

## Юз кейси

- Dev hot reload (nodemon, vite-node)
- Перезавантаження config без рестарту (файл feature flags)
- Синхронізація локальних артефактів у build pipeline

## Документація

- [fs.watch — Node.js](https://nodejs.org/api/fs.html#fswatchfilename-options-listener)
