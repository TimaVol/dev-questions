---
title: "Яка різниця між git merge та git rebase?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 168
difficulty: easy
---

## Відповідь

Merge — створює merge commit, зберігає історію гілок. Rebase — переносить коміти feature-гілки поверх main, лінійна історія. Rebase не роби на shared/public гілках без узгодження.

## Приклад

```bash
git checkout feature
git rebase main   # лінійна історія
# або
git merge feature # merge commit
```

## Юз кейси

- Rebase feature branch перед PR — чистіша історія
- Merge у main — безпечніше для команди

## Документація

- [Git — Merge vs Rebase](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)
- [Git — Pro Git](https://git-scm.com/book/en/v2)
