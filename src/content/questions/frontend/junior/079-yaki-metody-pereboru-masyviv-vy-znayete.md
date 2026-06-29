---
title: "Які методи перебору масивів ви знаєте?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 79
difficulty: easy
---

## Відповідь

`forEach` — перебір без нового масиву. `map` — трансформація. `filter` — відбір. `reduce` — згортання до одного значення. Також `find`, `some`, `every`, `flatMap`.

## Приклад

```js
const prices = [100, 200, 300];
const withTax = prices.map((p) => p * 1.2);
const expensive = prices.filter((p) => p > 150);
const total = prices.reduce((sum, p) => sum + p, 0);
```

## Юз кейси

- `map` — рендер списку в React
- `filter` — пошук активних користувачів

## Документація

- [Array methods — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array)
