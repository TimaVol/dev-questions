---
title: "Як створити нову гілку в Git?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 172
difficulty: easy
---

## Відповідь

`git switch -c branch-name` (або `git checkout -b`) — створити і перейти. Або `git branch name` + `git switch name`. Пуш на remote: `git push -u origin branch-name`.

## Приклад

```bash
git switch main
git pull
git switch -c feature/login-page
```

## Юз кейси

- Нова гілка від актуального main перед фічею
- `-u` при першому push — tracking remote branch

## Документація

- [Git — Pro Git](https://git-scm.com/book/en/v2)
