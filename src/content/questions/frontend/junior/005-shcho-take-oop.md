---
title: "Що таке ООП?"
topic: frontend
grade: junior
category: "Загальні питання"
order: 5
difficulty: easy
---

## Відповідь

ООП — підхід, де дані й поведінка об'єднуються в об'єкти. Чотири стовпи: інкапсуляція, успадкування, поліморфізм і абстракція. У фронтенді це класи, прототипи та компоненти зі станом.

## Приклад

```js
class Cart {
  constructor() {
    this.items = [];
  }
  add(product) {
    this.items.push(product);
  }
  total() {
    return this.items.reduce((sum, p) => sum + p.price, 0);
  }
}
```

## Юз кейси

- Моделювання доменної логіки (кошик, замовлення)
- Класові React-компоненти або сервіси з інкапсульованим станом

## Документація

- [Classes — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Classes)
