---
title: "Чи є у вас досвід з PWA?"
topic: frontend
grade: middle
category: "JavaScript"
order: 69
difficulty: medium
---

## Відповідь

PWA — веб-застосунок з manifest, Service Worker і можливістю встановлення на домашній екран. SW кешує assets для офлайн-роботи. Workbox спрощує стратегії кешування. На iOS обмеження: немає push, install через «На екран Домой». Lighthouse PWA audit перевіряє готовність.

## Приклад

```json
{
  "name": "MyShop",
  "start_url": "/",
  "display": "standalone",
  "icons": [{ "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }]
}
```

## Юз кейси

- Офлайн-каталог для торгових представників у полі
- «Додати на головний екран» для e-commerce
- Workbox precache для shell SPA

## Документація

- [Service Worker API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
