---
title: "Що таке область видимості змінної?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 76
difficulty: medium
---

## Відповідь

Scope визначає, де змінна доступна. `let`/`const` — block scope (всередині `{}`). `var` — function scope. Вкладені функції бачать змінні зовнішніх scope (lexical scoping).

## Приклад

```js
function outer() {
  const a = 1;
  function inner() {
    console.log(a); // 1 — доступ через closure
  }
  inner();
}
```

## Юз кейси

- Уникнення витоку змінних у глобальний scope
- Модульний патерн з IIFE і приватними змінними

## Документація

- [let/const — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Statements/let)
- [CSS variables — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
