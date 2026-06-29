---
title: "Як працює наслідування в CSS?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 24
difficulty: medium
---

## Відповідь

Дочірні елементи успадковують деякі властивості від батьків: `color`, `font-family`, `line-height`. Margin, padding, border — не успадковуються.

## Приклад

```css
body {
  font-family: system-ui, sans-serif;
  color: #333;
}
/* <p> всередині body отримає шрифт і колір автоматично */
```

## Юз кейси

- Базова типографіка на `body` для всього сайту
- `color: inherit` для посилань, що повторюють колір батьківського тексту

## Документація

- [Inheritance — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Inheritance)
- [Cascade — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade)
