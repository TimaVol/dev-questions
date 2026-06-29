---
title: "Як оптимізувати стилі для друку на принтері?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 23
difficulty: easy
---

## Відповідь

`@media print`: приховати nav, footer, ads (`display: none`), чорний текст на білому, `page-break-inside: avoid` для таблиць. Розширити контент на всю ширину.

## Приклад

```css
@media print {
  nav, .ads, .chat-widget { display: none !important; }
  body { font-size: 12pt; color: #000; }
  a[href]::after { content: " (" attr(href) ")"; }
}
```

## Юз кейси

- Друк рахунку-фактури з e-commerce
- PDF-звіт з таблицею замовлень
- Приховати cookie banner при друку

## Документація

- [@media print — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#print)
- [Printing — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries#targeting_media_types)
