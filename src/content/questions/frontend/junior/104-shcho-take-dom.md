---
title: "Що таке DOM?"
topic: frontend
grade: junior
category: "API браузера"
order: 104
difficulty: easy
---

## Відповідь

DOM (Document Object Model) — деревоподібне представлення HTML-сторінки, яке браузер будує з розмітки. JS може читати, змінювати, додавати й видаляти вузли через DOM API.

## Приклад

```js
const tree = document.documentElement;
console.log(tree.children); // html → head, body
```

## Юз кейси

- Динамічне оновлення списку без перезавантаження
- Побудова UI з даних API

## Документація

- [DOM — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [Introduction to the DOM — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
