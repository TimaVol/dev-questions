---
title: "Які формати картинок знаєте, чим вони відрізняються?"
topic: frontend
grade: junior
category: "Web Performance"
order: 63
difficulty: easy
---

## Відповідь

JPEG — фото, втратне стиснення. PNG — прозорість, без втрат. WebP/AVIF — сучасні, менший розмір. SVG — вектор, іконки. GIF — анімація (краще відео або CSS).

## Приклад

```html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero" width="1200" height="600">
</picture>
```

## Юз кейси

- WebP/AVIF для hero-зображень з fallback на JPEG
- SVG для іконок і логотипів

## Документація

- [Image formats — MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)
