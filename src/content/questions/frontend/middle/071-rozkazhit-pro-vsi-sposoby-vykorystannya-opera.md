---
title: "Розкажіть про всі способи використання оператора ’...’."
topic: frontend
grade: middle
category: "JavaScript"
order: 71
difficulty: easy
---

## Відповідь

Spread (`...`) розгортає масив або об’єкт у literals, збирає rest-параметри функції, робить shallow copy. Rest у деструктуризації збирає «залишок». Це не deep clone — вкладені об’єкти копіюються за посиланням.

## Приклад

```js
const defaults = { theme: 'light', lang: 'uk' };
const settings = { ...defaults, ...userPrefs, lang: 'en' };

const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
const [head, ...tail] = [1, 2, 3, 4];
```

## Юз кейси

- Immutable update стану React: `{ ...state, items: [...state.items, newItem] }`
- Rest params замість застарілого `arguments`
- Merge конфігів збірки з дефолтами

## Документація

- [Spread syntax — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
