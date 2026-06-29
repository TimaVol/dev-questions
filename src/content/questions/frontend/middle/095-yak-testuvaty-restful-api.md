---
title: "Як тестувати RESTful API?"
topic: frontend
grade: middle
category: "Тести"
order: 95
difficulty: medium
---

## Відповідь

На фронтенді — MSW або mock `fetch` для ізольованих тестів. Перевіряю status code, тіло відповіді, headers і error cases (401, 422, 500). Contract tests звіряють відповідь з OpenAPI schema. У backend-integration — supertest або Playwright `request` API.

## Приклад

```js
import { http, HttpResponse } from 'msw';

server.use(
  http.get('/api/users', () => HttpResponse.json([{ id: 1, name: 'Оля' }]))
);

const res = await fetch('/api/users');
expect(res.status).toBe(200);
```

## Юз кейси

- MSW mock для тестів списку користувачів
- Contract test: відповідь відповідає OpenAPI schema
- Тест обробки 401 з редіректом на login

## Документація

- [HTTP request methods — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [Mock Service Worker — Docs](https://mswjs.io/docs/)
