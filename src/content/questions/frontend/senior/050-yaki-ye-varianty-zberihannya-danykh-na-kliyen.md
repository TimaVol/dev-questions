---
title: "Які є варіанти зберігання даних на клієнті?"
topic: frontend
grade: senior
category: "JavaScript"
order: 50
difficulty: easy
---

## Відповідь

| Сховище | Обсяг | TTL | Доступ з JS | Типові кейси |
|---------|-------|-----|-------------|--------------|
| **Cookies** | ~4KB | server-set expiry | так (не httpOnly) | session id, preferences |
| **localStorage** | ~5–10MB | без TTL | sync | theme, draft form |
| **sessionStorage** | ~5MB | до закриття tab | sync | wizard step state |
| **IndexedDB** | великий | без TTL | async | offline cache, files |
| **Cache API** | великий | SW-controlled | async | static assets, API responses |

Правила senior: **токени й PII — httpOnly Secure cookies**, не localStorage (XSS). Sensitive data — encrypt at rest лише якщо threat model вимагає; краще не зберігати взагалі. Quota exceeded — graceful degradation. Safari ITP обмежує third-party storage.

## Приклад

```ts
// UI preferences — localStorage OK
localStorage.setItem('theme', 'dark');

// Auth token — httpOnly cookie (server sets)
// Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict

// Large offline data — IndexedDB
const db = await openDB('app-cache', 1, {
  upgrade(db) { db.createObjectStore('products', { keyPath: 'id' }); },
});
await db.put('products', { id: 1, name: 'Товар' });
```

## Юз кейси

- Shopping cart guest user: localStorage + sync при login
- PWA offline catalog: IndexedDB + Cache API через Service Worker
- «Запам'ятати мене»: refresh token у httpOnly cookie, не JWT у localStorage

## Документація

- [Web Storage API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [IndexedDB API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
