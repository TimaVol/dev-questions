---
title: "Як працює CSS-функція clamp()? Назвіть корисні приклади її використання."
topic: frontend
grade: middle
category: "HTML/CSS"
order: 22
difficulty: medium
---

## Відповідь

`clamp(min, preferred, max)` — fluid sizing без media queries. `font-size: clamp(1rem, 2.5vw, 1.5rem)` — типографіка масштабується плавно.

## Приклад

```css
.hero-title { font-size: clamp(1.5rem, 4vw + 0.5rem, 3rem); }
.container { width: clamp(320px, 90vw, 1200px); margin-inline: auto; }
```

## Юз кейси

- Fluid typography на landing page
- Контейнер без жорстких breakpoints
- Padding що адаптується до viewport

## Документація

- [clamp() — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [CSS lengths — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
