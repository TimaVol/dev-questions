---
title: "Як можна оптимізувати CSS для кращої продуктивності?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 13
difficulty: medium
---

## Відповідь

Зменшити CSS: purge невикористаних класів (Tailwind), critical CSS inline, уникати `@import` (блокує парсинг), один bundle або split by route, мінімізувати specificity wars, `@layer` для порядку.

## Приклад

```css
/* critical — inline у <head> */
.hero { min-height: 60vh; font-size: clamp(1.5rem, 4vw, 3rem); }

/* решта — async/defer завантаження */
```

## Юз кейси

- PurgeCSS після міграції з Bootstrap
- Critical CSS для above-the-fold
- Code-split CSS по маршрутах у Next.js

## Документація

- [CSS performance — MDN](https://developer.mozilla.org/en-US/docs/Learn/Performance/CSS)
- [Specificity — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
