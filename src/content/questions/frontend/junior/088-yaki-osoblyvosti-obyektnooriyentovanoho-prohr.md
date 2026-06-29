---
title: "Які особливості об’єктноорієнтованого програмування у JavaScript?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 88
difficulty: easy
---

## Відповідь

JS — прототипна мова: успадкування через ланцюжок прототипів, не класи як у Java. ES6 `class` — синтаксичний цукор. Об'єкти — first-class, функції теж об'єкти.

## Приклад

```js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} звучить`; }
}
class Dog extends Animal {
  speak() { return `${this.name} гавкає`; }
}
```

## Юз кейси

- Класові React-компоненти (legacy)
- Фабрики об'єктів замість класів для простих сутностей

## Документація

- [Classes — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Classes)
