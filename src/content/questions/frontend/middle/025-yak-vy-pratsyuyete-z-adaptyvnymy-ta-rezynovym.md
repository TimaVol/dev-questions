---
title: "Як ви працюєте з адаптивними та резиновими макетами? Як розглядаєте проблеми, пов’язані з різними роздільними здатностями екранів і пристроями?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 25
difficulty: medium
---

## Відповідь

Mobile-first media queries, fluid units (`%`, `fr`, `clamp`), `max-width` containers, responsive images (`srcset`, `sizes`). Тестую на реальних пристроях і емуляторах, не лише DevTools.

## Приклад

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: 1rem;
}
```

## Юз кейси

- Mobile-first каталог товарів
- `100dvh` замість `100vh` на iOS
- `srcset` для retina-зображень

## Документація

- [Media queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
