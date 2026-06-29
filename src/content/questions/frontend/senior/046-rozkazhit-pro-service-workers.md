---
title: "Розкажіть про Service Workers."
topic: frontend
grade: senior
category: "JavaScript"
order: 46
difficulty: hard
---

## Відповідь

**Service Worker** — background script між app і network; lifecycle: register → install → activate → fetch/message. Можливості: **offline cache** (Cache API), **push notifications**, **background sync**. Scope — same-origin path. Без доступу до DOM. Оновлення: новий SW чекає закриття вкладок (`skipWaiting` + `clients.claim()` для негайного). Стратегії: cache-first (assets), network-first (API), stale-while-revalidate. Senior: версіонувати caches, обмежувати розмір, не кешувати authenticated API.

## Приклад

Register + stale-while-revalidate:

```js
// main.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js
const CACHE = 'static-v2';
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/','/app.js','/style.css'])));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached =>
      fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => cached)
    )
  );
});
```

## Юз кейси

- PWA offline: shell у cache, API network-first з fallback offline-сторінкою
- Push notifications: SW `push` event → showNotification
- Cache bust: перейменувати CACHE при deploy, видалити старий у `activate`

## Документація

- [Service Worker API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
