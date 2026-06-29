---
title: "Як скопіювати теку з вкладеними файлами та іншими теками за допомогою node:fs?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 23
difficulty: easy
---

## Відповідь

Node 16.7+: `fs.promises.cp(src, dest, { recursive: true, force, errorOnExist, filter })` — офіційний спосіб. Раніше — ручний обхід: `readdir` + `stat`/`lstat`, `mkdir`, `copyFile` для файлів, рекурсія для dirs. Зверніть увагу на symlinks (`verbatimSymlinks`), permissions (`preserveTimestamps`), cross-device (`EXDEV` — fallback на stream copy). Для великих tree — `fs.cp` ефективніший за shell `cp -r` у portable коді.

## Приклад

```js
import fs from 'node:fs/promises';

await fs.cp('./dist', './backup/dist', {
  recursive: true,
  force: true,
  filter: (src) => !src.endsWith('.map'), // skip source maps
});

// Cross-platform, preserves structure
await fs.mkdir('./out/nested', { recursive: true });
await fs.copyFile('./src/index.js', './out/nested/index.js');
```

## Юз кейси

- Deploy artifact snapshot перед rollback
- Template/scaffold generators
- Test fixtures setup/teardown

## Документація

- [fs.cp — Node.js](https://nodejs.org/api/fs.html#fscpsrc-dest-options-callback)
