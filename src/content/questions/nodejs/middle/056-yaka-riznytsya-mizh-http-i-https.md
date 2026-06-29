---
title: "Яка різниця між HTTP і HTTPS?"
topic: nodejs
grade: middle
category: "Networking & API"
order: 56
difficulty: easy
---

## Відповідь

**HTTP** — відкритий текст через TCP, порт 80. Дані (заголовки, тіло, cookies, JWT) видимі при перехопленні (MITM).

**HTTPS** — HTTP поверх TLS, порт 443. Шифрування, цілісність, автентифікація сервера через сертифікат.

Для API backend:
- Продакшн — лише HTTPS (редирект HTTP → HTTPS)
- TLS termination — nginx/ALB або Node.js `https.createServer`
- Заголовок HSTS — примусовий HTTPS у браузері
- Let's Encrypt / ACM для сертифікатів

## Приклад

```js
import https from 'node:https';
import fs from 'node:fs';

const options = {
  key: fs.readFileSync('/etc/ssl/private/key.pem'),
  cert: fs.readFileSync('/etc/ssl/certs/cert.pem'),
};

https.createServer(options, app).listen(443);
// Або TLS termination на nginx, Node слухає HTTP :3000 internally
```

## Юз кейси

- TLS termination на nginx + Node HTTP всередині
- mTLS для service-to-service автентифікації
- cert-manager у K8s для автоматичного оновлення

## Документація

- [TLS — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security)
