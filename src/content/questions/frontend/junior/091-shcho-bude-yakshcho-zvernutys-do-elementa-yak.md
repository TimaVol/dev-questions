---
title: "Що буде, якщо звернутись до елемента, якого немає за індексом (const arr = [’a’, ’b’]; console.log(arr[20])?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 91
difficulty: easy
---

## Відповідь

Поверне `undefined` — без помилки. Масив не кидає exception за неіснуючий індекс, на відміну від деяких мов.

## Приклад

```js
const arr = ['a', 'b'];
console.log(arr[20]);  // undefined
console.log(arr.length); // 2
```

## Юз кейси

- Перевірка `arr[i] !== undefined` перед використанням
- Optional chaining при доступі до вкладених даних

## Документація

- [Array — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array)
