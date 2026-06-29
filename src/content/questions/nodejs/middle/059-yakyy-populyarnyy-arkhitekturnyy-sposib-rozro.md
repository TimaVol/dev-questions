---
title: "Який популярний архітектурний спосіб розробки API ви знаєте?"
topic: nodejs
grade: middle
category: "Networking & API"
order: 59
difficulty: easy
---

## Відповідь

**REST** — найпоширеніший: ресурси як URL, HTTP-дієслова (GET/POST/PUT/PATCH/DELETE), коди статусу, безстанність, JSON-тіло. HATEOAS — опційно.

Структура:
- `/api/v1/users/:id` — іменники, не дієслова
- Версіонування: шлях URL або заголовок
- Пагінація: `?page=1&limit=20` або cursor
- Автентифікація: JWT Bearer, API keys

Альтернативи: GraphQL (гнучкі запити), gRPC (внутрішні мікросервіси), tRPC (type-safe монорепо).

Стеки Node.js: Express, Fastify, NestJS — усі REST-first.

## Приклад

```js
// RESTful routes
router.get('/users', listUsers);           // 200 + array
router.get('/users/:id', getUser);         // 200 | 404
router.post('/users', createUser);         // 201 + Location header
router.patch('/users/:id', updateUser);    // 200 | 404
router.delete('/users/:id', deleteUser);   // 204 | 404
```

## Юз кейси

- OpenAPI/Swagger-документація для публічного API
- Ідемпотентний PUT для upsert ресурсів
- 429 + Retry-After для обмеження частоти запитів

## Документація

- [REST API — MDN](https://developer.mozilla.org/en-US/docs/Glossary/REST)
