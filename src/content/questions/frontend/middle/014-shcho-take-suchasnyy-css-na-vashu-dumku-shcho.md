---
title: "Що таке «сучасний CSS», на вашу думку? Що із сучасного CSS ви використовуєте в щоденній роботі?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 14
difficulty: medium
---

## Відповідь

Сучасний CSS охоплює Grid/Flexbox, custom properties, `:is()`/`:where()`, container queries, `@layer`, nesting, `clamp()`, logical properties. Використовую те, що підтримує Baseline targets проєкту — прогресивне покращення.

## Приклад

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: var(--space-md, 1rem);
}
@container (min-width: 400px) {
  .card { display: flex; }
}
```

## Юз кейси

- Container queries замість лише media queries
- CSS variables для темної теми
- `@layer` для ізоляції utility- та component-стилів

## Документація

- [CSS variables — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Grid — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
