---
title: "Як ви б організували завантаження великої кількості CSS-стилів на сторінці так, щоб користувач міг якнайшвидше взаємодіяти з нею, при цьому уникнувши зсуву макета?"
topic: frontend
grade: middle
category: "Performance"
order: 46
difficulty: hard
---

## Відповідь

Critical CSS inline, решту — асинхронно, `media="print"` окремо. Code-split по маршрутах. Уникати render-blocking `@import`. Preload ключових шрифтів. `font-display: swap`.

## Приклад

```html
<style>/* critical above-fold */</style>
<link rel="stylesheet" href="/app.css" media="print" onload="this.media='all'">
```

## Юз кейси

- Розбиття 500KB CSS на чанки за маршрутами
- Inline critical, відкладене завантаження решти
- Font subsetting для кирилиці

## Документація

- [Resource hints — web.dev](https://web.dev/learn/performance/resource-hints)
- [rel=preload — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)
