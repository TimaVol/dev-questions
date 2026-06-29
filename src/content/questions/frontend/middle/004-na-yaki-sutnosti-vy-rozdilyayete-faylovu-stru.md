---
title: "На які сутності ви розділяєте файлову структуру на початку проєктування?"
topic: frontend
grade: middle
category: "Загальні запитання"
order: 4
difficulty: medium
---

## Відповідь

Ділю на фічі (`features/checkout`), спільні шари (`components/ui`, `lib`) і інфраструктуру (`api`). Тести й типи — поруч із модулем (colocation). Папка = бізнес-область, не тип файлу на верхньому рівні.

## Приклад

```
src/features/auth/LoginForm.tsx
src/components/ui/Button.tsx
src/lib/api-client.ts
```

## Юз кейси

- Старт SPA з feature-based структурою
- Виділення `features/billing` при зростанні логіки
- Colocation тестів для швидшого рефакторингу

