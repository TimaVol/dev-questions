---
title: "Які алгоритми сортування ви знаєте і як вони працюють?"
topic: frontend
grade: junior
category: "Алгоритми та структури даних"
order: 158
difficulty: easy
---

## Відповідь

Bubble/Insertion — O(n²), прості. Merge/Quick sort — O(n log n), стандарт у `Array.sort()`. На фронті — `arr.sort((a, b) => a - b)` для чисел, для об'єктів — comparator.

## Приклад

```js
const users = [{ age: 30 }, { age: 20 }];
users.sort((a, b) => a.age - b.age);
```

## Юз кейси

- Сортування таблиці за колонкою
- `localeCompare` для алфавітного сортування рядків

## Документація

- [Array.sort — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
