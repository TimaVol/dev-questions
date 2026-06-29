---
title: "Які інструменти і підходи використовують для моніторингу та аналізу продуктивності фронтенд-застосунків?"
topic: frontend
grade: junior
category: "Web Performance"
order: 155
difficulty: medium
---

## Відповідь

Для моніторингу та профілювання фронтенду використовують: Lighthouse і Chrome DevTools Performance для лабораторного аналізу; метрики Web Vitals (LCP, INP, CLS); RUM-сервіси (Sentry, Datadog, Vercel Analytics) для реальних користувачів; аналізатор бандлу для розміру залежностей; React Profiler для рендерингу компонентів.

## Приклад

```js
import { onLCP } from 'web-vitals';
onLCP((metric) => analytics.send('LCP', metric.value));
```

## Юз кейси

- Lighthouse CI у PR — блокування регресій
- Sentry Performance — повільні транзакції на продакшні

## Документація

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse — web.dev](https://web.dev/learn/performance/lighthouse-performance)
