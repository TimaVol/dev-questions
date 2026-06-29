---
title: "Як ви оптимізуєте роботу зображень на вебсторінці для покращення продуктивності?"
topic: frontend
grade: junior
category: "Web Performance"
order: 66
difficulty: easy
---

## Відповідь

Сучасні формати (WebP/AVIF), responsive `srcset`/`sizes`, явні `width`/`height`, `loading="lazy"` для below-the-fold, CDN з ресайзом на льоту.

## Приклад

```html
<img
  src="product-400.webp"
  srcset="product-400.webp 400w, product-800.webp 800w"
  sizes="(max-width: 600px) 100vw, 400px"
  width="400" height="300"
  loading="lazy"
  alt="Товар"
>
```

## Юз кейси

- Каталог — lazy load картинок поза viewport
- `<picture>` з AVIF для браузерів, що підтримують

## Документація

- [Media queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [Code splitting — web.dev](https://web.dev/learn/performance/code-split-javascript)
