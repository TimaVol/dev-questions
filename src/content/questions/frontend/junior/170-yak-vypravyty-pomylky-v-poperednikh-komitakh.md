---
title: "Як виправити помилки в попередніх комітах?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 170
difficulty: medium
---

## Відповідь

Непушений останній commit — `git commit --amend`. Кілька комітів — interactive rebase (`git rebase -i`). Вже запушено — новий fix commit; amend/rebase лише якщо ніхто не стягнув гілку.

## Приклад

```bash
# Виправити останній commit (не запушений)
git add forgotten-file.ts
git commit --amend --no-edit
```

## Юз кейси

- Забув файл у commit — amend перед push
- Typo в повідомленні — `git commit --amend -m "новий текст"`

## Документація

- [Git — Rewriting History](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
