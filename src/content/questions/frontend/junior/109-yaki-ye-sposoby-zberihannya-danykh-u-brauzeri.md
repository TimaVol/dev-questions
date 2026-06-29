---
title: "Які є способи зберігання даних у браузері?"
topic: frontend
grade: junior
category: "API браузера"
order: 109
difficulty: easy
---

## Відповідь

`localStorage` / `sessionStorage` — рядки, синхронно. Cookies — для серверної сесії, httpOnly для токенів. IndexedDB — великі структуровані дані. Cache API — для service worker.

## Приклад

```js
localStorage.setItem('theme', 'dark');
document.cookie = 'lang=uk; path=/; max-age=31536000';
```

## Юз кейси

- `localStorage` — налаштування UI
- httpOnly cookie — JWT refresh token (ставить сервер)

## Документація

- [Web Storage API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [IndexedDB — MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
