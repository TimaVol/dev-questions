---
title: "Які основні команди Git ви знаєте і для чого їх використовують?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 167
difficulty: easy
---

## Відповідь

`git clone`, `status`, `add`, `commit`, `push`, `pull`, `branch`, `checkout`/`switch`, `merge`, `log`, `diff`. Staging area — `add`, знімок — `commit`, синхронізація — `push`/`pull`.

## Приклад

```bash
git status
git add src/app.ts
git commit -m "feat: add user profile page"
git push origin feature/profile
```

## Юз кейси

- Щоденний цикл: pull → зміни → add → commit → push
- `git diff` перед commit для self-review

## Документація

- [Git — Pro Git](https://git-scm.com/book/en/v2)
- [Git — Reference](https://git-scm.com/docs)
