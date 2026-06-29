---
title: "Як оптимізуєте завантаження сторінок, зокрема використання Critical CSS та інших стратегій для зменшення часу до першого байту та часу до відображення?"
topic: frontend
grade: senior
category: "Performance"
order: 29
difficulty: hard
---

## Відповідь

TTFB — сервер (CDN, cache, SSR speed). FCP/LCP — **critical rendering path**: inline **critical CSS** (above-the-fold), defer non-critical CSS (`media="print" onload`), preload fonts з `font-display: swap`, пріоритет LCP image (`fetchpriority="high"`, preload). JS — defer/async, code splitting. HTTP/2+ — не concat everything, cache hashed assets long-term. Senior вимірює: Lighthouse, WebPageTest, RUM (Core Web Vitals). Critical CSS: **critters** (Vite plugin), **penthouse**, або manual extract для landing.

## Приклад

```html
<head>
  <style>/* critical ~14KB inlined */
    .hero{display:flex;min-height:60vh;background:#111;color:#fff}
    .hero h1{font-size:clamp(2rem,5vw,4rem)}
  </style>
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
  <link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
</head>
```

Vite + SSR critical CSS:

```js
// vite-plugin-critters or @vitejs/plugin-legacy patterns
import critters from 'critters';
// inlines critical CSS at build time from rendered HTML
```

## Юз кейси

- Marketing landing: inline critical, решта async — LCP −400ms
- SPA dashboard: critical CSS не потрібен; фокус на JS chunk size і skeleton UI
- SSR Next.js: `next/font` + автоматична CSS optimization на route

## Документація

- [Extract critical CSS — web.dev](https://web.dev/articles/extract-critical-css)
- [HTTP caching — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
