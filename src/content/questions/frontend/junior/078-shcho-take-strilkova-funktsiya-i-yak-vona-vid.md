---
title: "Що таке стрілкова функція і як вона відрізняється від звичайної функції?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 78
difficulty: medium
---

## Відповідь

Стрілка `=>` — короткий синтаксис, немає власного `this` (бере з оточення), немає `arguments`, не можна використати як конструктор. Звичайна функція має динамічний `this`.

## Приклад

```js
const double = (n) => n * 2;
const obj = {
  value: 42,
  getValue: function () { return this.value; },
  getArrow: () => this, // this — зовнішнє, не obj
};
```

## Юз кейси

- Короткі callbacks у `map`/`filter`
- Не використовувати стрілку як метод об'єкта, якщо потрібен `this`

## Документація

- [Arrow functions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
