---
title: "Які формати зображень краще використовувати у вебі? Які методи оптимізації зображень для вебу?"
topic: frontend
grade: middle
category: "Performance"
order: 40
difficulty: medium
---

## Відповідь

**WebP/AVIF** — краще стиснення за JPEG/PNG. **SVG** — іконки, логотипи. `<picture>` з fallback. Оптимізація: responsive `srcset`, lazy loading, CDN, compression (Squoosh, sharp).

## Приклад

```html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Банер" width="1200" height="600" loading="lazy">
</picture>
```

## Юз кейси

- AVIF з WebP/JPEG fallback
- `srcset` для retina і mobile
- Lazy loading нижче fold

## Документація

- [Image formats — MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)
- [Choose the right image format — web.dev](https://web.dev/articles/choose-the-right-image-format)
