---
title: "Що таке контекст? Як можна змінювати контекст виконання функції?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 86
difficulty: hard
---

## Відповідь

`this` — контекст виклику функції. У методі об'єкта `this` — сам об'єкт. Змінити: `call(ctx, ...args)`, `apply(ctx, [args])`, `bind(ctx)` — повертає нову функцію з прив'язаним `this`.

## Приклад

```js
function greet() { return `Привіт, ${this.name}`; }
const user = { name: 'Оля' };
greet.call(user); // "Привіт, Оля"
const bound = greet.bind(user);
```

## Юз кейси

- `bind` для callback, щоб зберегти `this` компонента
- Borrowing методу: `Array.prototype.slice.call(arguments)`

## Документація

- [this — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Operators/this)
