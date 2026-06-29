---
title: "Наведіть приклади функції, що самовикликається."
topic: nodejs
grade: junior
category: "JavaScript"
order: 26
difficulty: easy
---

## Відповідь

IIFE (Immediately Invoked Function Expression) — функція, яку оголошують і одразу викликають. Створює ізольований scope, щоб змінні не потрапили в global. Синтаксис: `(function () { ... })()` або `(async () => { ... })()`. У сучасному Node з ES modules IIFE рідше потрібні — модулі вже ізольовані.

## Приклад

```js
const counter = (() => {
  let count = 0;
  return {
    inc() { return ++count; },
    get() { return count; },
  };
})();

console.log(counter.inc()); // 1
console.log(counter.get()); // 1
```

## Юз кейси

- Модульний патерн до появи ES modules
- Одноразова ініціалізація при завантаженні файлу
- Closure для приватного стану без класів

## Документація

- [IIFE / Closures — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)
