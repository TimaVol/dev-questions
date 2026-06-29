---
title: "Уявіть, що є старий проєкт на підтримці (не JS-стек, бек на PHP-фреймворку), який перекинули на вас з іншої команди. Завдання: максимально оптимізувати фронтенд-проєкту, вклавшись у бюджет і 16 годин. Опишіть вашу стратегію оптимізації та кроки в межах означених обмежень."
topic: frontend
grade: senior
category: "Performance"
order: 37
difficulty: hard
---

## Відповідь

16 годин — тільки **high-impact/low-risk**. План: **2h audit** (Lighthouse, WebPageTest, DevTools Coverage) → **priority list** → quick wins. Типово: compress/minify CSS/JS (already on server?), **lazy-load images** (`loading="lazy"`, srcset), **defer render-blocking scripts**, **remove unused CSS** (20–40% на legacy), **enable gzip/brotli**, **cache headers** на static assets, **fix CLS** (width/height on images), **reduce jQuery plugins** count. No rewrite. Document findings + backlog для наступного спринту. Measure before/after на 3 key pages.

## Приклад

16h breakdown:

| Години | Задача | Impact |
|--------|--------|--------|
| 2 | Lighthouse × 5 pages, record metrics | baseline |
| 3 | Image lazy + dimensions + WebP | LCP -30% |
| 2 | Defer/async scripts, move to footer | TBT -40% |
| 3 | Purge unused CSS (PurgeCSS on build) | -120KB |
| 2 | Cache-Control: immutable on hashed assets | repeat visit |
| 2 | Critical fixes: render-blocking font | FCP |
| 2 | Report + backlog + deploy | — |

```html
<!-- quick win -->
<img src="hero.jpg" width="1200" height="600" loading="lazy" decoding="async">
<script src="app.js" defer></script>
```

## Юз кейси

- PHP templates: додати lazy images без міграції JS framework
- jQuery carousel: замінити на CSS scroll-snap — 4h, −80KB JS
- Stakeholder report: «LCP 4.2s → 2.1s за 16h, next: bundle split 40h»

## Документація

- [Arrays as structures — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array)
