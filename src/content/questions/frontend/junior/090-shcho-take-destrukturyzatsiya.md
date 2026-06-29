---
title: "Що таке деструктуризація?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 90
difficulty: easy
---

## Відповідь

Деструктуризація — витягування значень з масиву або властивостей об'єкта в окремі змінні. Працює в параметрах функцій і при присвоєнні.

## Приклад

```js
const user = { name: 'Оля', age: 25 };
const { name, age } = user;
const [first, second] = ['a', 'b', 'c'];
```

## Юз кейси

- Props у React: `function Card({ title, price })`
- Swap змінних: `[a, b] = [b, a]`

## Документація

- [Destructuring — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)
