---
title: "Які методи центрування елемента в CSS?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 36
difficulty: easy
---

## Відповідь

Flexbox (`justify-content` + `align-items: center`), Grid (`place-items: center`), `margin: auto` для блокового елемента з фіксованою шириною, `position: absolute` + `transform: translate(-50%, -50%)`.

## Приклад

```css
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

## Юз кейси

- Центрування кнопки в hero-секції
- Модалка по центру екрана

## Документація

- [Centering — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_and_the_block_formatting_context)
