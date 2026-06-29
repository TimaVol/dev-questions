---
title: "У чому різниця між null та undefined?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 85
difficulty: easy
---

## Відповідь

`undefined` — змінна оголошена, але значення не присвоєне, або відсутня властивість. `null` — явне «порожнє» значення від розробника. `typeof undefined` → `"undefined"`, `typeof null` → `"object"`.

## Приклад

```js
let x;
console.log(x); // undefined

const user = { avatar: null }; // явно немає аватара
```

## Юз кейси

- API повертає `null` для відсутнього поля
- Optional chaining: `user?.avatar ?? '/default.png'`

## Документація

- [null — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/null)
- [undefined — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
