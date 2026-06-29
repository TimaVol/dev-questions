---
title: "Розкажіть про свій досвід використання CSS Grid Layout."
topic: frontend
grade: middle
category: "HTML/CSS"
order: 21
difficulty: medium
---

## Відповідь

CSS Grid — двовимірна сітка: `grid-template-columns/rows`, `gap`, `grid-area` для складних layout. Зручно для dashboard, галерей, «holy grail» без float hacks.

## Приклад

```css
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100dvh;
}
```

## Юз кейси

- Admin dashboard з sidebar + main
- Галерея з `auto-fill` і `minmax`
- Складний layout без Bootstrap grid

## Документація

- [CSS Grid — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
- [display — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
