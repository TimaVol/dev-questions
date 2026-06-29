---
title: "Що таке Flexbox? Як реалізувати верстку за допомогою Flexbox чи Grid і який підхід найбільш доречний в якому випадку?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 27
difficulty: medium
---

## Відповідь

Flexbox — одновимірний layout (ряд або колонка): навігація, центрування, розподіл простору. Grid — двовимірна сітка: макет сторінки, картки в кілька колонок.

## Приклад

```css
.nav { display: flex; gap: 1rem; justify-content: space-between; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
```

## Юз кейси

- Flexbox — header з лого зліва і меню справа
- Grid — каталог товарів у 3 колонки

## Документація

- [Flexbox — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
- [CSS Grid — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
