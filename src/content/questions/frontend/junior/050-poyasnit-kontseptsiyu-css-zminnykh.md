---
title: "Поясніть концепцію CSS-змінних."
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 50
difficulty: medium
---

## Відповідь

CSS-змінні (`--name`) оголошуються в `:root` або будь-якому селекторі і використовуються через `var(--name)`. Каскадуються — можна перевизначити на рівні компонента або теми.

## Приклад

```css
:root {
  --color-primary: #3b82f6;
  --spacing: 1rem;
}
.btn { background: var(--color-primary); padding: var(--spacing); }
```

## Юз кейси

- Темна/світла тема через перевизначення змінних на `[data-theme="dark"]`
- Design tokens — єдині кольори й відступи в проєкті

## Документація

- [CSS variables — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
