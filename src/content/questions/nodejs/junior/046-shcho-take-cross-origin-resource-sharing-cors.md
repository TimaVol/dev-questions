---
title: "Що таке Cross-Origin Resource Sharing (CORS)? Де трапляється?"
topic: nodejs
grade: junior
category: "WEB"
order: 46
difficulty: easy
---

## Відповідь

CORS — механізм браузера, що дозволяє сторінці з одного origin (scheme+host+port) робити запити на інший, якщо сервер явно дозволив це заголовками (`Access-Control-Allow-Origin` тощо). Без CORS браузер блокує відповідь (Same-Origin Policy). Трапляється при SPA на `localhost:5173` і API на `localhost:3000`, або різних доменах у prod.

## Приклад

```js
import cors from 'cors';

app.use(cors({
  origin: 'https://app.example.com',
  credentials: true,
}));

// або вручну
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://app.example.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
```

## Юз кейси

- Frontend + API на різних піддоменах
- Cookies/session з `credentials: 'include'`
- Preflight `OPTIONS` для POST з custom headers

## Документація

- [CORS — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
