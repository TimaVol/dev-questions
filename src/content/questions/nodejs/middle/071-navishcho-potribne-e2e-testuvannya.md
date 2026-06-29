---
title: "Навіщо потрібне E2E-тестування?"
topic: nodejs
grade: middle
category: "Тестування"
order: 71
difficulty: medium
---

## Відповідь

**E2E (End-to-End)** тести перевіряють повний flow від HTTP-запиту до відповіді через реальний стек: router → middleware → service → DB → response.

Ловлять проблеми, які unit/integration окремо пропускають:
- Неправильна реєстрація маршруту
- Неправильна конфігурація auth middleware
- CORS/заголовки у production-like середовищі
- Баги повного життєвого циклу запиту

Мінуси: повільні (секунди), нестабільні (таймінги, мережа), дорогі в CI. Тому мало e2e — лише критичні шляхи (логін, checkout, оплата).

Інструменти: Supertest, Playwright (API mode), колекції Postman/Newman.

## Приклад

```js
import { test, before, after } from 'node:test';
import request from 'supertest';
import { app, startServer, stopServer } from './server.js';

before(async () => { await startServer(); });
after(async () => { await stopServer(); });

test('user registration flow', async () => {
  const register = await request(app)
    .post('/api/v1/auth/register')
    .send({ email: 'new@example.com', password: 'SecurePass1!' })
    .expect(201);

  const login = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'new@example.com', password: 'SecurePass1!' })
    .expect(200);

  assert.ok(login.body.accessToken);

  await request(app)
    .get('/api/v1/profile')
    .set('Authorization', `Bearer ${login.body.accessToken}`)
    .expect(200);
});
```

## Юз кейси

- Smoke-тести після деплою на staging
- Критичний payment flow — максимум 3–5 e2e-тестів
- Колекція Newman у CI щоночі, не на кожен коміт

## Документація

- [Jest — Getting started](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/)
