---
title: "Які основні метрики вимірюють продуктивність сайту?"
topic: frontend
grade: middle
category: "Performance"
order: 36
difficulty: easy
---

## Відповідь

Core Web Vitals: **LCP** (швидкість найбільшого контенту), **INP** (відгук на взаємодію), **CLS** (стабільність layout). Також TTFB, FCP, TTI. Вимірюють Lighthouse, RUM (web-vitals), Chrome UX Report.

## Приклад

```js
import { onLCP, onINP, onCLS } from 'web-vitals';
onLCP(console.log);
onINP(console.log);
onCLS(console.log);
```

## Юз кейси

- Lighthouse CI у pull request
- RUM-метрики в production
- Оптимізація LCP через priority hero image

## Документація

- [Web Vitals](https://web.dev/vitals/)
