---
title: "Що таке адаптивний дизайн?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 45
difficulty: easy
---

## Відповідь

Адаптивний дизайн — layout і стилі підлаштовуються під різні розміри екранів через fluid grids, гнучкі зображення і медіазапити. Один код — комфортний вигляд на мобілці, планшеті й десктопі.

## Приклад

```css
.grid { display: grid; grid-template-columns: 1fr; }
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

## Юз кейси

- E-commerce каталог: 1 колонка на телефоні, 4 на десктопі
- Навігація: burger menu на мобілці, горизонтальне меню на широкому екрані

## Документація

- [Media queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
