---
title: "У чому різниця між var, let і const. У яких випадках що потрібно використовувати?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 71
difficulty: easy
---

## Відповідь

`var` — function scope, hoisting без TDZ (застарілий). `let` — block scope, можна перепризначити. `const` — block scope, не можна перепризначити посилання (об'єкти/масиви мутабельні). За замовчуванням — `const`, `let` коли значення змінюється.

## Приклад

```js
const API_URL = '/api';
let count = 0;
count += 1;
// let і const — block scope
if (true) { let x = 1; }
```

## Юз кейси

- `const` для імпортів, конфігів, функцій
- `let` для лічильника в циклі або стану в imperative-коді

## Документація

- [let/const — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Statements/let)
- [const — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Statements/const)
