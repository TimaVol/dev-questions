---
title: "Як реалізувати responsive design, використовуючи CSS?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 49
difficulty: easy
---

## Відповідь

Fluid layouts через `%`, `fr`, `minmax()`; гнучкі зображення `max-width: 100%`; медіазапити на breakpoints; mobile-first — базові стилі для вузького екрана, розширення для широкого.

## Приклад

```css
img { max-width: 100%; height: auto; }
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
```

## Юз кейси

- Картки товарів, що автоматично перебудовуються в колонки
- Адаптивна типографіка через `clamp(1rem, 2vw, 1.5rem)`

## Документація

- [Media queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
