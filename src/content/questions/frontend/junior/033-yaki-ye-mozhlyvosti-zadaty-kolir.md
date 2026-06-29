---
title: "Які є можливості задати колір?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 33
difficulty: easy
---

## Відповідь

Іменовані кольори (`red`), hex (`#ff0000`), rgb/rgba, hsl/hsla, `currentColor` (успадковує колір тексту). Сучасні формати: `oklch()`, CSS-змінні.

## Приклад

```css
.btn {
  color: #fff;
  background: rgb(59 130 246);
  border-color: hsl(220 80% 50%);
}
```

## Юз кейси

- `currentColor` для іконок, що повторюють колір тексту кнопки
- CSS-змінні для темної/світлої теми

## Документація

- [CSS colors — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)
