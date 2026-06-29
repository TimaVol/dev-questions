---
title: "Як ви розумієте, що настав час відокремити певну сутність у проєкті?"
topic: frontend
grade: middle
category: "Загальні запитання"
order: 5
difficulty: medium
---

## Відповідь

Виділяю сутність, коли є окрема причина для змін, код дублюється 3+ рази або файл >200–300 рядків і змішує UI з бізнес-логікою.

## Приклад

```ts
export function formatOrderDate(iso: string, locale = 'uk-UA') {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(iso));
}
```

## Юз кейси

- Винесення `useDebounce` з пошуку й фільтрів
- `features/billing` для логіки підписки
- API-шар замість fetch у кожному компоненті

