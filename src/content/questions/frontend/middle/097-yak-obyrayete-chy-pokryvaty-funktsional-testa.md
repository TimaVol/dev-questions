---
title: "Як обираєте, чи покривати функціонал тестами?"
topic: frontend
grade: middle
category: "Тести"
order: 97
difficulty: medium
---

## Відповідь

Тестую: бізнес-логіку, edge cases, код схильний до регресій. Не тестую: тривіальні константи, thin wrappers без логіки, generated boilerplate. Оцінюю risk vs effort: payment/auth — завжди; CSS-only зміни — visual review. Flaky e2e стабілізую або замінюю integration.

## Приклад

```js
// Так: calcTax(amount, region) — багато гілок і ставок
// Ні: export function getApiUrl() { return import.meta.env.VITE_API_URL; }
```

## Юз кейси

- Risk-based coverage: 80% зусиль на 20% критичного коду
- Characterization tests перед рефакторингом legacy
- Пропуск тестів для one-line config exports
