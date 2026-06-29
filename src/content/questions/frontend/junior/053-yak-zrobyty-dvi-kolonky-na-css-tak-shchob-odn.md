---
title: "Як зробити дві колонки на CSS так, щоб одна розтягувалася, а інша — ні?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 53
difficulty: medium
---

## Відповідь

Flexbox: фіксована колонка + `flex: 1` на другій. Grid: `grid-template-columns: 200px 1fr` — перша фіксована, друга займає решту.

## Приклад

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1rem;
}
```

## Юз кейси

- Sidebar фіксованої ширини + основний контент на всю решту
- Панель фільтрів зліва і список товарів справа

## Документація

- [CSS Grid — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
