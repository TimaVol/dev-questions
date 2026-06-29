---
title: "Які методи вертикального центрування в CSS ви знаєте?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 37
difficulty: medium
---

## Відповідь

Flexbox `align-items: center`, Grid `align-items: center`, `line-height` дорівнює висоті для одного рядка тексту, `position: absolute` + `top: 50%` + `transform: translateY(-50%)`.

## Приклад

```css
.row {
  display: flex;
  align-items: center;
  height: 60px;
}
```

## Юз кейси

- Вирівнювання іконки і тексту в кнопці
- Вертикальне центрування контенту в navbar

## Документація

- [Centering — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_and_the_block_formatting_context)
