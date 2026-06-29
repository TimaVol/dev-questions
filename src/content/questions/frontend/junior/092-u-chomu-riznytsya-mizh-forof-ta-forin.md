---
title: "У чому різниця між for..of та for...in?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 92
difficulty: easy
---

## Відповідь

`for...of` — ітерує значення ітерованих об'єктів (масив, рядок, Map). `for...in` — перебирає перераховувані ключі об'єкта (включно з успадкованими) — для масивів не використовуй.

## Приклад

```js
const arr = ['a', 'b'];
for (const val of arr) console.log(val); // a, b

const obj = { x: 1, y: 2 };
for (const key in obj) console.log(key, obj[key]);
```

## Юз кейси

- `for...of` — перебір масиву елементів
- `for...in` — перебір полів plain object

## Документація

- [for...of — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
- [for...in — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
