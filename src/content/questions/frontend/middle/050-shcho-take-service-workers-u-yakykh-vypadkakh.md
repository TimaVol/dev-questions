---
title: "Що таке Service Workers, у яких випадках їх використовуєте?"
topic: frontend
grade: middle
category: "JavaScript"
order: 50
difficulty: medium
---

## Відповідь

Service Worker — проксі між мережею і кешем. PWA: offline, push, background sync. Lifecycle: install → activate → fetch. Workbox спрощує стратегії кешування (cache-first, network-first).

## Приклад

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
```

## Юз кейси

- Offline fallback для SPA
- Cache-first для статичних ресурсів
- Push notifications у PWA

## Документація

- [Service Worker API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
