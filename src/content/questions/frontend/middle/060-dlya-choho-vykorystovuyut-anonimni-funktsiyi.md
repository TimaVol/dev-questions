---
title: "Для чого використовують анонімні функції?"
topic: frontend
grade: middle
category: "JavaScript"
order: 60
difficulty: medium
---

## Відповідь

Анонімні функції зручні як короткі колбеки (`map`, `addEventListener`), IIFE для ізоляції scope до появи ES modules, і стрілочні функції без власного `this`. Для рекурсії та складної логіки краще named function — у stack trace видно ім’я, легше дебажити.

## Приклад

```js
(function () {
  const config = { api: '/v1' };
  window.app = { getConfig: () => config };
})();

[1, 2, 3].map((n) => n * 2);
```

## Юз кейси

- IIFE в legacy-скрипті без bundler
- Колбек `click` у React без окремої named function
- `setTimeout(() => retry(), 1000)` для повторного запиту

## Документація

- [Functions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
