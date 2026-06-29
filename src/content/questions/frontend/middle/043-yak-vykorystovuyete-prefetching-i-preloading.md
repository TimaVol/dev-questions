---
title: "Як використовуєте prefetching і preloading ресурсів для підвищення швидкості переходу між сторінками?"
topic: frontend
grade: middle
category: "Performance"
order: 43
difficulty: medium
---

## Відповідь

`<link rel="preload">` — критичний ресурс поточної сторінки. `prefetch` — ресурс для наступної навігації. `preconnect` — DNS+TLS до API/CDN. Next.js `<Link prefetch>`.

## Приклад

```html
<link rel="preconnect" href="https://api.myshop.ua">
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="prefetch" href="/catalog.js">
```

## Юз кейси

- Preconnect до API origin
- Prefetch наступної сторінки в SPA
- Preload hero font

## Документація

- [Resource hints — web.dev](https://web.dev/learn/performance/resource-hints)
- [Code splitting — web.dev](https://web.dev/learn/performance/code-split-javascript)
