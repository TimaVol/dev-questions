---
title: "В чому різниця між такими ключовими словами мови, як string і String?"
topic: nodejs
grade: junior
category: "Node.js"
order: 16
difficulty: easy
---

## Відповідь

`string` — примітивний тип: літерал `'hello'` або результат операцій. `String` — обгортковий об'єкт (wrapper) з методами на прототипі. При виклику методу на примітиві (`'hi'.toUpperCase()`) JS тимчасово обгортає його в `String`. `typeof 'x'` → `"string"`, `typeof new String('x')` → `"object"`. У коді завжди використовуйте примітиви, не `new String()`.

## Приклад

```js
const a = 'node';
const b = new String('node');

console.log(typeof a); // 'string'
console.log(typeof b); // 'object'
console.log(a === b);  // false
console.log(a == b);   // true (примітив приводиться)
```

## Юз кейси

- Порівняння з БД: завжди примітивні рядки
- `String(raw)` template tag для raw strings
- Уникати `new String()` — плутанина в `===` і пам'яті

## Документація

- [String — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Primitive vs object — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
