---
title: "Що таке рефакторинг і як ви його проводите?"
topic: frontend
grade: middle
category: "Загальні запитання"
order: 9
difficulty: medium
---

## Відповідь

Зміна структури без зміни поведінки. Малі PR: тести → rename/extract. Не змішувати рефакторинг із новою фічею.

## Приклад

```ts
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function submitForm(email: string) {
  if (!validateEmail(email)) throw new Error('Невірний email');
  return api.register(email);
}
```

## Юз кейси

- Extract валідації форми
- Розбиття 500-рядкового компонента
- Rename для читабельності

