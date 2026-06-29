---
title: "Які ви знаєте способи оголошення функції?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 24
difficulty: easy
---

## Відповідь

Основні способи:

- **Function declaration** — `function foo() {}` (hoisting).
- **Function expression** — `const foo = function() {}`.
- **Arrow function** — `const foo = () => {}` (без власного `this`).
- **Method shorthand** — `{ greet() {} }` в об'єкті.
- **Async function** — `async function foo() {}` / `async () => {}`.
- **Generator** — `function* gen() { yield 1; }`.

## Приклад

```js
function add(a, b) { return a + b; }

const multiply = (a, b) => a * b;

const service = {
  async getUser(id) {
    return db.findById(id);
  },
};
```

## Юз кейси

- Arrow у callbacks і `.map()` — короткий синтаксис
- Declaration для named hoisted helpers
- `async function` у Express route handlers

## Документація

- [Functions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
