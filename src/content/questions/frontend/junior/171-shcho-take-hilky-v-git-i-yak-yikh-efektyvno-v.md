---
title: "Що таке гілки в Git і як їх ефективно використовувати?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 171
difficulty: easy
---

## Відповідь

Гілка — незалежна лінія розробки. `main` — стабільна, `feature/*` — нові фічі, `fix/*` — баги. Короткоживучі гілки, merge/rebase після review, видаляй після merge.

## Приклад

```bash
git switch -c feature/user-avatar
# ... робота ...
git push -u origin feature/user-avatar
# PR → merge → delete branch
```

## Юз кейси

- Окрема гілка на кожен ticket у Jira
- Hotfix branch від `main` для критичного бага

## Документація

- [Git — Pro Git](https://git-scm.com/book/en/v2)
