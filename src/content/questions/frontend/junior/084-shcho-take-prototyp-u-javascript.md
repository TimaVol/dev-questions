---
title: "Що таке прототип у JavaScript?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 84
difficulty: medium
---

## Відповідь

Кожен об'єкт має внутрішнє посилання `[[Prototype]]`. При зверненні до властивості JS шукає її в об'єкті, потім у ланцюжку прототипів. Класи в ES6 — синтаксичний цукор над прототипами.

## Приклад

```js
const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;
console.log(dog.eats); // true — з прототипу
```

## Юз кейси

- Успадкування через `class Dog extends Animal`
- Розширення вбудованих типів — краще не чіпати прототипи Array/String

## Документація

- [Prototype chain — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
