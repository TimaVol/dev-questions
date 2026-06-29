---
title: "Як зробити останній елемент списку червоним, незалежно від довжини списку без JS?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 32
difficulty: easy
---

## Відповідь

Псевдоклас `:last-child` або `:last-of-type` вибере останній елемент без JavaScript.

## Приклад

```css
ul li:last-child {
  color: red;
}
```

## Юз кейси

- Підсвітка останнього пункту меню
- Прибрати border-bottom у останнього елемента списку

## Документація

- [ul/ol lists — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)
- [:last-child — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:last-child)
