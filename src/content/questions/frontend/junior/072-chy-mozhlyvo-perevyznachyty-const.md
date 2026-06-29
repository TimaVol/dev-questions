---
title: "Чи можливо перевизначити const?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 72
difficulty: medium
---

## Відповідь

Перепризначити `const` змінну — ні, буде `TypeError`. Але вміст об'єкта чи масиву можна змінювати — `const` фіксує лише посилання.

## Приклад

```js
const user = { name: 'Оля' };
user.name = 'Іван'; // OK
// user = {};       // TypeError
```

## Юз кейси

- `const` для об'єкта стану, де мутуємо поля
- Захист від випадкового перепризначення змінної

## Документація

- [const — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Statements/const)
