---
title: "Що таке JSON і як працювати з ним у JavaScript?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 80
difficulty: easy
---

## Відповідь

JSON — текстовий формат обміну даними (об'єкти, масиви, рядки, числа, boolean, null). У JS: `JSON.stringify(obj)` — в рядок, `JSON.parse(str)` — в об'єкт.

## Приклад

```js
const user = { id: 1, name: 'Оля' };
const json = JSON.stringify(user);
const parsed = JSON.parse(json);
```

## Юз кейси

- Відправка тіла POST-запиту на API
- Зберігання об'єкта в `localStorage`

## Документація

- [JSON — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/JSON)
