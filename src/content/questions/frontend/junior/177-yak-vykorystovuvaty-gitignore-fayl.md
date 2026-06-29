---
title: "Як використовувати .gitignore файл?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 177
difficulty: easy
---

## Відповідь

`.gitignore` — список файлів/патернів, які Git ігнорує. `node_modules/`, `.env`, `dist/`, IDE-файли. Патерни: `*.log`, `!.env.example` (виняток).

## Приклад
```
node_modules/
dist/
.env
.env.local
!.env.example
*.log
.DS_Store
```

## Юз кейси

- Не комітити `.env` з API keys
- Ігнорувати build artifacts (`dist/`, `.next/`)

## Документація

- [Git — gitignore](https://git-scm.com/docs/gitignore)
- [Git — Pro Git](https://git-scm.com/book/en/v2)
