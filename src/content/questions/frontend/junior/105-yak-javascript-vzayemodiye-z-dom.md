---
title: "Як JavaScript взаємодіє з DOM?"
topic: frontend
grade: junior
category: "API браузера"
order: 105
difficulty: easy
---

## Відповідь

JS через DOM API знаходить елементи (`querySelector`), змінює вміст (`textContent`, `innerHTML`), атрибути (`setAttribute`), класи (`classList`), слухає події (`addEventListener`).

## Приклад

```js
const btn = document.querySelector('#submit');
btn.addEventListener('click', () => {
  document.querySelector('#status').textContent = 'Надіслано';
});
```

## Юз кейси

- Toggle класу `.open` на мобільному меню
- Додавання нового елемента в список після AJAX-відповіді

## Документація

- [Introduction to the DOM — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [querySelector — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
