---
title: "Що ви знаєте про Core Web Vitals?"
topic: frontend
grade: junior
category: "Web Performance"
order: 61
difficulty: medium
---

## Відповідь

Core Web Vitals — ключові метрики UX від Google: LCP (швидкість завантаження головного контенту), INP (відгук на взаємодію), CLS (візуальна стабільність). Впливають на SEO і сприйняття швидкості.

## Приклад

```html
<img src="hero.webp" width="800" height="400" fetchpriority="high" alt="Hero">
```

## Юз кейси

- Фіксація width/height на img для зменшення CLS
- Оптимізація LCP-елемента (hero image, великий текст)

## Документація

- [Web Vitals](https://web.dev/vitals/)
