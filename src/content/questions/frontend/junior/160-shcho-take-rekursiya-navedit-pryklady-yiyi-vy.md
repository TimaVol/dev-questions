---
title: "Що таке рекурсія, наведіть приклади її використання."
topic: frontend
grade: junior
category: "Алгоритми та структури даних"
order: 160
difficulty: easy
---

## Відповідь

Рекурсія — функція викликає сама себе з базовим випадком для зупинки. Підходить для дерев, вкладених структур, combinatorics. Обережно з глибиною стеку — для великих даних краще ітерація.

## Приклад

```js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function flatten(arr) {
  return arr.flatMap(item =>
    Array.isArray(item) ? flatten(item) : item
  );
}
```

## Юз кейси

- Рекурсивний рендер вкладених коментарів
- Обхід nested JSON у tree view

## Документація

- [Recursion — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)
