---
title: "Що таке замикання (closure) в JavaScript і як воно працює?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 75
difficulty: easy
---

## Відповідь

Closure — функція «пам'ятає» змінні зовнішньої області видимості навіть після того, як зовнішня функція завершилась. Утворюється при створенні функції всередині іншої.

## Приклад

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}
const counter = createCounter();
counter(); // 1
counter(); // 2
```

## Юз кейси

- Приватний стан у factory-функції
- Event handler з доступом до змінних компонента

## Документація

- [Closures — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
