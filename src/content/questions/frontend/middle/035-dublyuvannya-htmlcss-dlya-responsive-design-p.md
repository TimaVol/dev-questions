---
title: "Дублювання HTML/CSS для responsive design: плюси, мінуси, підводні камені."
topic: frontend
grade: middle
category: "HTML/CSS"
order: 35
difficulty: medium
---

## Відповідь

Дублювання HTML для mobile/desktop (`.mobile-only`, `.desktop-only`) — швидко, але SEO/a11y страждають (прихований контент), більше HTML. Краще: один DOM + responsive CSS (Grid/Flex, media queries).

## Приклад

```css
/* Погано: два блоки в DOM */
.mobile-nav { display: block; }
.desktop-nav { display: none; }
@media (min-width: 768px) {
  .mobile-nav { display: none; }
  .desktop-nav { display: flex; }
}
```

## Юз кейси

- Уникати дубльованого контенту для SEO
- Один `<nav>` з responsive layout
- `display: none` для a11y — обережно, не приховувати важливий контент

## Документація

- [Media queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
