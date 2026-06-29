---
title: "Які види обʼєктних моделей ви знаєте?"
topic: frontend
grade: middle
category: "JavaScript"
order: 58
difficulty: medium
---

## Відповідь

**Prototype-based** модель (JS) — об’єкти наслідують поведінку через ланцюжок `[[Prototype]]`, без обов’язкових класів. **Class syntax** — зручний цукор над прототипами (`extends`, `super`). **DOM/BOM** — об’єктні моделі документа й браузера (`document`, `window`). **Component model** (React/Vue) — UI як дерево компонентів зі станом.

## Приклад

```js
const animal = { speak() { return '…'; } };
const dog = Object.create(animal);
dog.speak = () => 'Гав!';

class Cat extends animal {
  speak() { return 'Мяу'; }
}
```

## Юз кейси

- Дебаг ланцюжка прототипів у DevTools
- Вибір між factory function і class для сервісу
- DOM як «жива» модель — зміна вузла одразу відображається на сторінці

## Документація

- [Document Object Model — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [Browser Object Model — MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/BOM)
