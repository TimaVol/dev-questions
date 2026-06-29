---
title: "Перерахуйте типи даних у JS."
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 68
difficulty: easy
---

## Відповідь

Примітиви: `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, `bigint`. Об'єктні: `object` (включно з масивами, функціями, датами). `typeof null` повертає `"object"` — відомий баг мови.

## Приклад

```js
typeof 'hello';     // "string"
typeof 42;          // "number"
typeof [];          // "object"
typeof null;        // "object"
```

## Юз кейси

- Перевірка типу перед обробкою API-відповіді
- Розрізнення `null` і `undefined` при дефолтних значеннях

## Документація

- [Data types — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
