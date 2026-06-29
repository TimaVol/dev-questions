---
title: "Як з JS-коду звернутись до HTML-елемента та змінити його текст?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 89
difficulty: easy
---

## Відповідь

Знайти елемент: `document.getElementById()`, `querySelector()`, `querySelectorAll()`. Змінити текст: `textContent` (безпечно) або `innerText`. Для HTML — `innerHTML` лише з довіреним контентом.

## Приклад

```js
const title = document.querySelector('#title');
title.textContent = 'Новий заголовок';
```

## Юз кейси

- Оновлення лічильника кошика після додавання товару
- Показ повідомлення про помилку валідації форми

## Документація

- [getElementById — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
- [HTMLElement — MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
