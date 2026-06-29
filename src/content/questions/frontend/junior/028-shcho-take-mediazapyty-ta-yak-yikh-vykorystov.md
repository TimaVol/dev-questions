---
title: "Що таке медіазапити та як їх використовувати?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 28
difficulty: medium
---

## Відповідь

Медіазапити (`@media`) застосовують CSS-правила за умовою — зазвичай за шириною екрана. Mobile-first: базові стилі для мобілки, потім `@media (min-width: 768px)` для планшета і десктопу.

## Приклад

```css
.sidebar { display: none; }
@media (min-width: 768px) {
  .sidebar { display: block; width: 250px; }
}
```

## Юз кейси

- Приховати бокове меню на мобілці, показати на десктопі
- Змінити кількість колонок grid на різних breakpoints

## Документація

- [Media queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
