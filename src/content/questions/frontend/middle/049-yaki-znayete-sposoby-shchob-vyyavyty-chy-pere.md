---
title: "Які знаєте способи, щоб виявити, чи перебуває елемент у viewport користувача?"
topic: frontend
grade: middle
category: "JavaScript"
order: 49
difficulty: medium
---

## Відповідь

**Intersection Observer** — ефективний спосіб. Також `getBoundingClientRect()` (дорожче), scroll listener + throttle. IO — для lazy load, infinite scroll, відстеження видимості в аналітиці.

## Приклад

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) loadImage(e.target);
  });
}, { rootMargin: '200px' });
document.querySelectorAll('img[data-src]').forEach((img) => io.observe(img));
```

## Юз кейси

- Lazy load зображень при прокрутці
- Пагінація з infinite scroll
- Viewability tracking для реклами

## Документація

- [Intersection Observer — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
