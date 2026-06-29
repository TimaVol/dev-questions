---
title: "Чи ознайомлені ви зі складанням бюджету продуктивності (Performance Budget)? Як ви розумієте це поняття?"
topic: frontend
grade: senior
category: "Performance"
order: 39
difficulty: hard
---

## Відповідь

Performance budget — **кількісні ліміти** на metrics/resources: JS bundle ≤ 200KB gzip, LCP ≤ 2.5s, CLS ≤ 0.1, total page weight ≤ 1MB, max 3 font files. Enforce через **CI** (bundlesize, Lighthouse CI, SpeedCurve). Budget від **user context**: 3G mobile vs desktop fiber. При перевищенні — block merge або justification. Senior задає budgets від **Core Web Vitals thresholds** + business data (conversion drop на 100ms delay). Перегляд щокварталу з ростом app.

## Приклад

```json
// lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

```json
// package.json — bundle budget
"bundlesize": [
  { "path": "./dist/js/*.js", "maxSize": "200 kB" },
  { "path": "./dist/css/*.css", "maxSize": "50 kB" }
]
```

## Юз кейси

- PR додає 80KB lodash: CI fails bundlesize — dev використовує lodash-es/debounce only
- New marketing page: budget 150KB JS — обрати Astro замість full React SPA
- Quarterly review: budget creep 180→240KB — schedule dependency audit

## Документація

- [Performance budgets — web.dev](https://web.dev/articles/performance-budgets-101)
- [Lighthouse performance scoring — web.dev](https://web.dev/articles/performance-scoring)
