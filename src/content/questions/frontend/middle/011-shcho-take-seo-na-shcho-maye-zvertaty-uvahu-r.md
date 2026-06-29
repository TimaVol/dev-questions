---
title: "Що таке SEO? На що має звертати увагу розробник для забезпечення гарних SEO-показників у майбутньому?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 11
difficulty: medium
---

## Відповідь

SEO — оптимізація для пошукових систем. Розробник відповідає за семантичний HTML, meta title/description, canonical, sitemap, Core Web Vitals (LCP, CLS, INP) і structured data. SSR/SSG покращує індексацію SPA.

## Приклад

```html
<head>
  <title>Каталог взуття — MyShop</title>
  <meta name="description" content="Купуйте кросівки з безкоштовною доставкою">
  <link rel="canonical" href="https://myshop.ua/shoes">
</head>
<main><h1>Взуття</h1><article>...</article></main>
```

## Юз кейси

- Оптимізація LCP через priority images
- Canonical для дубльованих URL
- SSR для індексації React-сторінок

## Документація

- [meta — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
