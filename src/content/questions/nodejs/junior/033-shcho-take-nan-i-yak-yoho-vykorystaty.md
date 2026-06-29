---
title: "Що таке NaN і як його використати?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 33
difficulty: easy
---

## Відповідь

`NaN` (Not a Number) — спеціальне значення типу `number`, результат невалідної математики (`0/0`, `parseInt('abc')`). Особливість: `NaN !== NaN`. Перевірка: `Number.isNaN(x)` (сувора) або `Number.isNaN` vs застарілий `isNaN` (з приведенням типів). `Number(x)` для парсингу з fallback.

## Приклад

```js
const raw = process.env.PORT;
const port = Number(raw);

if (Number.isNaN(port)) {
  throw new Error(`Invalid PORT: ${raw}`);
}

console.log(Number.isNaN(NaN));      // true
console.log(Number.isNaN('hello'));  // false
console.log(isNaN('hello'));         // true — приводить до number
```

## Юз кейси

- Валідація query params перед запитом до БД
- Перевірка результатів математичних обчислень
- Фільтрація: `values.filter((v) => !Number.isNaN(v))`

## Документація

- [isNaN — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN)
