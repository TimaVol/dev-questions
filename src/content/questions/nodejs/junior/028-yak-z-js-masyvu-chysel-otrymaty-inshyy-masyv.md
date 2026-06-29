---
title: "Як з JS масиву чисел отримати інший масив, де залишаться тільки числа понад 10? Яку функцію масиву для цього використовувати?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 28
difficulty: easy
---

## Відповідь

Метод **`filter`** повертає новий масив елементів, для яких callback повертає truthy. Не мутує оригінал. Для «числа > 10»: `nums.filter((n) => n > 10)`. Складність O(n), один прохід.

## Приклад

```js
const prices = [5, 12, 8, 25, 3, 18];
const expensive = prices.filter((p) => p > 10);
// [12, 25, 18]

// У Node: фільтрація результатів запиту
const activeUsers = users.filter((u) => u.status === 'active');
```

## Юз кейси

- Відбір валідних записів перед записом у БД
- Фільтрація помилкових результатів API
- Комбінація з `map`: `items.filter(Boolean).map(transform)`

## Документація

- [Array.filter — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
