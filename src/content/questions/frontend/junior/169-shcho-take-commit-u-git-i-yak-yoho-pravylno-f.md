---
title: "Що таке commit у Git і як його правильно формувати?"
topic: frontend
grade: junior
category: "Git і системи контролю версій"
order: 169
difficulty: easy
---

## Відповідь

Commit — знімок змін з повідомленням. Один логічний змін — один commit. Формат: `type: опис` (feat, fix, refactor). Тіло — чому, не що (diff показує що).

## Приклад

```bash
git commit -m "fix: prevent double submit on checkout form"
```

## Юз кейси

- `feat:` для нової фічі, `fix:` для бага
- Атомарні коміти — легше revert і bisect

## Документація

- [Git — Pro Git](https://git-scm.com/book/en/v2)
