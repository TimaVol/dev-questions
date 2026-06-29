---
title: "Ваш сайт довго завантажується на мобільному пристрої. Розкажіть крок за кроком, як будете шукати причину."
topic: frontend
grade: junior
category: "Web Performance"
order: 64
difficulty: easy
---

## Відповідь

Відкрию Lighthouse/DevTools на mobile throttling, подивлюсь Network (важкі ресурси, TTFB), Performance (long tasks), Coverage (зайвий JS). Перевірю LCP-елемент, розмір зображень, render-blocking скрипти.

## Приклад

```js
// DevTools → Network → Slow 3G, перевірити waterfall
// Шукати: великі img, блокуючі script без defer
```

## Юз кейси

- Hero image 3MB — конвертувати в WebP і додати responsive srcset
- 500KB JS bundle — code splitting і lazy load роутів

## Документація

- [Web Vitals](https://web.dev/vitals/)
- [Code splitting — web.dev](https://web.dev/learn/performance/code-split-javascript)
