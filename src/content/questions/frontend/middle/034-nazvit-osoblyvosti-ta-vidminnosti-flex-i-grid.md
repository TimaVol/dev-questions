---
title: "Назвіть особливості та відмінності flex і grid? Чому віддаєте перевагу?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 34
difficulty: medium
---

## Відповідь

Flexbox — одновимірний (рядок або колонка): `justify-content`, `align-items`, `gap`. Grid — двовимірний: сітка рядків і колонок. Flex для nav/toolbar; Grid для page layout і галерей.

## Приклад

```css
.nav { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```

## Юз кейси

- Navbar через Flexbox
- Product grid через Grid
- Holy grail layout через Grid areas

## Документація

- [Flexbox — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
- [CSS Grid — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
