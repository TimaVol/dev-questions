---
title: "Які стратегії вибору віток використовують у різних розробницьких процесах?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 173
difficulty: easy
---

## Відповідь

**Git Flow** — довгоживучі гілки: main, develop, feature, release, hotfix. **GitHub Flow** — спрощена модель: main + короткі feature-гілки + pull request. **Trunk-based** — часті коміти безпосередньо в main із feature flags. Стартапи зазвичай обирають GitHub Flow, великі компанії — Git Flow.

## Приклад

```bash
# GitHub Flow
git switch -c fix/header-bug
# fix → PR → review → merge to main → deploy
```

## Юз кейси

- GitHub Flow — CI/CD з автодеплоєм з main
- Release-гілка для версіонованого продукту

## Документація

- [GitHub Actions](https://docs.github.com/en/actions)
- [Git — Pro Git](https://git-scm.com/book/en/v2)
