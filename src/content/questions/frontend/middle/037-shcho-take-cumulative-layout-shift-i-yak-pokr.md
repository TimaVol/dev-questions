---
title: "Що таке Cumulative Layout Shift і як покращити його значення?"
topic: frontend
grade: middle
category: "Performance"
order: 37
difficulty: medium
---

## Відповідь

CLS — неочікуваний зсув layout під час завантаження. Фікси: `width`/`height` на img, `aspect-ratio`, резерв місця для ads, не вставляти контент над існуючим, `font-display: swap` з fallback metrics.

## Приклад

```html
<img src="product.webp" width="400" height="300" alt="Кросівки"
     style="aspect-ratio: 4/3; width: 100%; height: auto;">
```

## Юз кейси

- Резерв місця для dynamic banner
- Skeleton з фіксованою висотою
- Web font з `size-adjust` fallback

## Документація

- [Cumulative Layout Shift — web.dev](https://web.dev/articles/cls)
- [Web Vitals](https://web.dev/vitals/)
