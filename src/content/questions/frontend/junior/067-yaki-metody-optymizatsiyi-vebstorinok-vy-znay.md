---
title: "Які методи оптимізації вебсторінок ви знаєте?"
topic: frontend
grade: junior
category: "Web Performance"
order: 67
difficulty: medium
---

## Відповідь

Мініфікація і стиснення (gzip/brotli), code splitting, lazy loading, кешування (Cache-Control), CDN, оптимізація зображень, критичний CSS, `defer`/`async` на скриптах, SSR/SSG для швидшого FCP.

## Приклад

```html
<script src="analytics.js" async></script>
<script src="app.js" defer></script>
```

## Юз кейси

- `defer` на основному bundle — не блокує парсинг
- CDN для статики з довгим `max-age`

## Документація

- [Web Vitals](https://web.dev/vitals/)
- [Code splitting — web.dev](https://web.dev/learn/performance/code-split-javascript)
