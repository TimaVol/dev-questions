---
title: "Як використовувати теги в Git?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 174
difficulty: easy
---

## Відповідь

Теги — мітки на комітах, зазвичай для релізів (`v1.2.0`). Lightweight — просто ім'я. Annotated — з повідомленням і автором. Пуш: `git push origin v1.2.0` або `git push --tags`.

## Приклад

```bash
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```

## Юз кейси

- Semantic versioning для npm-пакетів
- Deploy конкретного тегу на production

## Документація

- [Git — Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [Git — Pro Git](https://git-scm.com/book/en/v2)
