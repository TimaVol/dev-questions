---
title: "Що таке HTTP і HTTPS, яка між ними різниця?"
topic: frontend
grade: junior
category: "Основи мережі та протоколи"
order: 136
difficulty: easy
---

## Відповідь

HTTP передає дані відкритим текстом — їх можна перехопити в публічному Wi‑Fi. HTTPS додає TLS: шифрування каналу, перевірку цілісності й сертифікат сервера. Для логінів, платежів і API сьогодні використовують лише HTTPS.

## Приклад

```js
// Браузер робить TLS handshake перед першим байтом даних
const res = await fetch('https://api.shop.ua/orders', {
  credentials: 'include', // cookie з прапором Secure працюють лише через HTTPS
});
```

## Юз кейси

- Форма оплати — пароль і номер картки не повинні йти через `http://`
- Змішаний контент: `http://` картинка на HTTPS-сторінці — браузер блокує або попереджає
- Безкоштовний сертифікат (Let's Encrypt) для продакшн-домену

## Документація

- [TLS — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security)
- [HTTP overview — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
