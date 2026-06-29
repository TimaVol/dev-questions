---
title: "Які властивості CSS впливають на швидкодію?"
topic: frontend
grade: junior
category: "Web Performance"
order: 51
difficulty: easy
---

## Відповідь

Важкі для рендеру: `box-shadow`, `filter`, `backdrop-filter`, анімація `width`/`height`/`top`/`left`. Легші для GPU: `transform` і `opacity`. Великі селектори і `!important` уповільнюють matching, але рідко критично.

## Приклад

```css
/* Краще — compositor-friendly */
.card { transition: transform 0.2s, opacity 0.2s; }
.card:hover { transform: scale(1.02); }
```

## Юз кейси

- Анімація hover через `transform` замість `width`
- `will-change: transform` на елементі, що часто анімується

## Документація

- [Selectors — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)
- [Animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
