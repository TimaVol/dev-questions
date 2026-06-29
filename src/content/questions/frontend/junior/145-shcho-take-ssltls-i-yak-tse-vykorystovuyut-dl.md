---
title: "Що таке SSL/TLS і як це використовують для реалізації безпечного з'єднання?"
topic: frontend
grade: junior
category: "Основи мережі та протоколи"
order: 145
difficulty: easy
---

## Відповідь

TLS шифрує трафік між клієнтом і сервером, перевіряє сертифікат сервера. HTTPS = HTTP + TLS. Захищає від перехоплення паролів, cookies, MITM-атак.

## Приклад

```js
// fetch автоматично використовує TLS для https://
const res = await fetch('https://secure-api.example.com/login', {
  method: 'POST',
  credentials: 'include',
});
```

## Юз кейси

- Обов'язковий HTTPS для login-форм
- HSTS header — примусовий HTTPS

## Документація

- [TLS — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security)
