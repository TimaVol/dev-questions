---
title: "Як працює механізм CORS (Cross-Origin Resource Sharing)?"
topic: frontend
grade: junior
category: "Основи мережі та протоколи"
order: 142
difficulty: hard
---

## Відповідь

Same-Origin Policy забороняє `fetch` між різними origin (протокол + домен + порт). CORS дозволяє це, якщо сервер відповідає заголовками `Access-Control-Allow-Origin` і, за потреби, `Allow-Methods`/`Allow-Headers`. Для «непростих» запитів браузер спочатку надсилає preflight `OPTIONS`.

## Приклад

```js
// Фронт app.shop.ua → API api.shop.ua
const res = await fetch('https://api.shop.ua/products', {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
});

// На сервері api.shop.ua:
// Access-Control-Allow-Origin: https://app.shop.ua
// Access-Control-Allow-Credentials: true
```

## Юз кейси

- SPA на `app.example.com`, API на `api.example.com` — без CORS fetch падає з помилкою в консолі
- Preflight для POST з `Content-Type: application/json`
- Локально: проксі в `vite.config.ts` перенаправляє `/api` на бекенд без CORS

## Документація

- [CORS — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
