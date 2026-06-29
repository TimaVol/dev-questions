---
title: "Як можна оптимізувати алгоритми за допомогою мемоізації?"
topic: frontend
grade: junior
category: "Алгоритми та структури даних"
order: 161
difficulty: hard
---

## Відповідь

Мемоізація — кешування результатів функції для однакових аргументів. Уникає повторних обчислень у рекурсії (Fibonacci, DP). У React — `useMemo` для дорогих обчислень.

## Приклад

```js
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
```

## Юз кейси

- Fibonacci з кешем — O(n) замість O(2^n)
- `useMemo` для фільтрації великого списку

## Документація

- [Memoization with Map — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Map)
