---
title: "Як функціонує кешування вебресурсів?"
topic: frontend
grade: junior
category: "Основи мережі та протоколи"
order: 144
difficulty: easy
---

## Відповідь

Браузер кешує за заголовками `Cache-Control`, `ETag`, `Last-Modified`. `max-age` — час життя. `no-cache` — перевірка з сервером. Service Worker — programmatic cache для PWA.

## Приклад

```http
Cache-Control: public, max-age=31536000, immutable
```

## Юз кейси

- Статика з hash у імені (`app.a1b2c3.js`) — cache forever
- HTML — `no-cache` для свіжих деплоїв

## Документація

- [HTTP caching — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Service Worker API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
