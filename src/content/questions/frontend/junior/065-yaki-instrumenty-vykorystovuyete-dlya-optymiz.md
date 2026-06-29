---
title: "Які інструменти використовуєте для оптимізації швидкості завантаження вебсторінки у роботі з HTML і CSS?"
topic: frontend
grade: junior
category: "Web Performance"
order: 65
difficulty: medium
---

## Відповідь

Lighthouse, Chrome DevTools (Network, Performance), WebPageTest, Bundle Analyzer для JS/CSS. У build: мініфікація, critical CSS, preload ключових шрифтів і LCP-зображення.

## Приклад

```html
<link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin>
<link rel="preload" href="/hero.webp" as="image">
```

## Юз кейси

- Preload шрифту для уникнення FOIT
- Lighthouse CI у pull request для контролю регресій
