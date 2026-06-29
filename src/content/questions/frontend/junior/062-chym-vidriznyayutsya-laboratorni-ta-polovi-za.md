---
title: "Чим відрізняються лабораторні та польові заміри перформансу?"
topic: frontend
grade: junior
category: "Web Performance"
order: 62
difficulty: easy
---

## Відповідь

Лабораторні (Lighthouse, DevTools) — контрольоване середовище, відтворювані. Польові (RUM, CrUX) — реальні користувачі з різними пристроями, мережею, геолокацією. Обидва потрібні.

## Приклад

```js
// Польовий замір через Performance API
const lcp = performance.getEntriesByType('largest-contentful-paint').at(-1);
console.log(lcp?.startTime);
```

## Юз кейси

- Lighthouse у CI для регресій перед деплоєм
- RUM (Sentry, Vercel Analytics) для реального досвіду користувачів

## Документація

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse — web.dev](https://web.dev/learn/performance/lighthouse-performance)
