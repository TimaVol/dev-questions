---
title: "Як браузер дізнається, яку сторінку завантажити за адресою домену?"
topic: nodejs
grade: middle
category: "Networking & API"
order: 55
difficulty: medium
---

## Відповідь

Кроки від URL до response (релевантно для backend developer):

- **DNS lookup** — domain → IP (A/AAAA record)
- **TCP handshake** — connection до server:443
- **TLS handshake** — HTTPS certificate verify
- **HTTP request** — `GET /path HTTP/1.1`, Host header
- **Server routing** — nginx/Node.js matches path → handler
- **Response** — HTML/JSON + headers

Backend контролює: virtual hosts, path routing, reverse proxy rules. CDN може cache static на edge.

## Приклад

```js
// Node.js HTTP server — routing by path
import http from 'node:http';

http.createServer((req, res) => {
  const { method, url, headers } = req;
  const host = headers.host; // api.example.com

  if (url === '/health') return res.end('ok');
  if (url?.startsWith('/api/v1/')) {
    return handleApi(req, res);
  }
  res.statusCode = 404;
  res.end('Not Found');
}).listen(443);
```

## Юз кейси

- nginx reverse proxy: `api.example.com` → Node port 3000
- Virtual host routing у Express `app.use('/api/v1', router)`
- DNS TTL і CDN cache для global API

## Документація

- [HTTP-повідомлення — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
- [TLS — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security)
