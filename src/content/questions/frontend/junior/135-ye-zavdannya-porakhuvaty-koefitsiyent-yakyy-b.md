---
title: "Є завдання порахувати коефіцієнт, який буде потрібен у компоненті і який залежить тільки від декількох констант у проєкті. Де його найкраще порахувати?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 135
difficulty: medium
---

## Відповідь

Якщо значення залежить лише від констант і не змінюється — обчисли один раз на рівні модуля (`const COEFF = BASE * RATE`). `useMemo` тут зайвий — модульний scope простіше.

## Приклад

```js
const TAX_RATE = 0.2;
const PRICE_COEFF = 1 + TAX_RATE;

function Price({ amount }) {
  return <span>{(amount * PRICE_COEFF).toFixed(2)} ₴</span>;
}
```

## Юз кейси

- Константи з `config.ts` — коефіцієнт поруч з ними
- Не рахувати в render — це зайва робота на кожен ререндер

## Документація

- [useMemo — React](https://react.dev/reference/react/useMemo)
