---
title: "Різниця між == і ===."
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 83
difficulty: medium
---

## Відповідь

`==` — нестроге порівняння з приведенням типів (`'5' == 5` → true). `===` — строге, без приведення (`'5' === 5` → false). Завжди використовуй `===`.

## Приклад

```js
0 == false;   // true
0 === false;  // false
null == undefined;  // true
null === undefined; // false
```

## Юз кейси

- Порівняння ID з API — завжди `===`
- Уникнення багів від неявного type coercion

## Документація

- [Equality — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
