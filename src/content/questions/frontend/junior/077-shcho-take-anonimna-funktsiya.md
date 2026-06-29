---
title: "Що таке анонімна функція?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 77
difficulty: easy
---

## Відповідь

Анонімна функція — без імені, часто передається як callback або одразу викликається (IIFE). У сучасному коді частіше стрілкові функції.

## Приклад

```js
[1, 2, 3].map(function (n) { return n * 2; });
// або
[1, 2, 3].map((n) => n * 2);
```

## Юз кейси

- Callback у `setTimeout`, `addEventListener`
- IIFE для ізоляції scope: `(function () { ... })()`

## Документація

- [Functions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
