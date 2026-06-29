---
title: "Як розмістити хрестик для закриття справа зверху елемента?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 31
difficulty: easy
---

## Відповідь

Батьківський елемент — `position: relative`, хрестик — `position: absolute` з `top` і `right`.

## Приклад

```css
.modal { position: relative; }
.modal__close {
  position: absolute;
  top: 8px;
  right: 8px;
}
```

## Юз кейси

- Кнопка закриття модального вікна
- Видалення тегу в input з чіпсами

## Документація

- [position — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
