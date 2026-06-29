---
title: "Що таке конфлікт злиття і як його вирішити?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 175
difficulty: medium
---

## Відповідь

Конфлікт — коли дві гілки змінили той самий рядок. Git позначає `<<<<<<<`, `=======`, `>>>>>>>`. Вручну обери потрібний код, видали маркери, `git add` і заверши merge/rebase.

## Приклад

```bash
git merge feature
# CONFLICT in app.ts
# Відредагуй файл, потім:
git add app.ts
git commit
```

## Юз кейси

- Два деви змінили один компонент — merge conflict
- `git mergetool` або IDE merge editor для візуального вирішення

## Документація

- [Git — Merge vs Rebase](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)
- [Git — Pro Git](https://git-scm.com/book/en/v2)
