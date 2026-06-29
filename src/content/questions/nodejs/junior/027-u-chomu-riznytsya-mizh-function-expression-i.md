---
title: "У чому різниця між function expression і function declaration?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 27
difficulty: easy
---

## Відповідь

**Declaration** (`function foo() {}`) — hoisting: можна викликати до рядка оголошення в тому ж scope. **Expression** (`const foo = function() {}`) — створюється під час виконання рядка присвоєння; до нього — TDZ (для `const`/`let`). Expression може бути анонімною або named (`function bar() {}` у присвоєнні). Arrow functions — завжди expression.

## Приклад

```js
greet(); // OK — hoisting
function greet() { console.log('hi'); }

// sayHi(); // ReferenceError
const sayHi = function () { console.log('hello'); };
sayHi(); // OK
```

## Юз кейси

- Declaration для top-level helpers у модулі
- Expression для умовного оголошення: `const fn = cond ? a : b`
- Уникати виклику expression до рядка оголошення

## Документація

- [Functions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
