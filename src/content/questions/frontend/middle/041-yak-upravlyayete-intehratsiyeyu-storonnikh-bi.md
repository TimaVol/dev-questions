---
title: "Як управляєте інтеграцією сторонніх бібліотек або плагінів для зменшення впливу на продуктивність?"
topic: frontend
grade: middle
category: "Performance"
order: 41
difficulty: medium
---

## Відповідь

Dynamic import для важких libs, tree-shaking, перевірка bundle analyzer. Завантажувати third-party (analytics, chat) після `load` або за згодою. Subresource Integrity для CDN.

## Приклад

```js
const Chart = await import('chart.js');
// analytics — після consent
if (consent.analytics) {
  const { init } = await import('./analytics');
  init();
}
```

## Юз кейси

- Lazy load chart.js лише на dashboard
- Cookie consent перед GTM
- SRI для CDN scripts

## Документація

- [Dynamic import — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)
- [Code splitting — web.dev](https://web.dev/learn/performance/code-split-javascript)
