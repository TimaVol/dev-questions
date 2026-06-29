---
title: "Як використовуєте інструменти забезпечення якості коду, такі як ESLint? Як визначаєте та дотримуєтеся кодового стилю в проєкті?"
topic: frontend
grade: middle
category: "JavaScript"
order: 66
difficulty: medium
---

## Відповідь

ESLint ловить баги й порушення стилю, Prettier форматує без суперечок. Husky + lint-staged запускають перевірку на pre-commit. У monorepo — спільний `@company/eslint-config`. Правила узгоджую з командою один раз, далі CI enforce.

## Приклад

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## Юз кейси

- Спільний ESLint-конфіг для 5 пакетів monorepo
- Автофікс форматування перед комітом
- CI падає, якщо хтось пропустив lint локально

## Документація

- [ESLint — Docs](https://eslint.org/docs/latest/)
