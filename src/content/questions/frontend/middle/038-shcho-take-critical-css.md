---
title: "Що таке Critical CSS?"
topic: frontend
grade: middle
category: "Performance"
order: 38
difficulty: medium
---

## Відповідь

Critical CSS — мінімальні стилі для above-the-fold контенту, inline у `<head>` для швидшого first paint. Решта CSS — async/defer. Генерують через critters, critical package або вручну.

## Приклад

```html
<head>
  <style>/* critical */ .hero{min-height:60vh}.nav{display:flex}</style>
  <link rel="preload" href="/styles.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
</head>
```

## Юз кейси

- Inline critical CSS на landing
- critters у Vite/Next build
- Покращення FCP на повільному 3G

## Документація

- [Optimize LCP — web.dev](https://web.dev/articles/optimize-lcp)
- [link — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)
