---
title: "Для чого потрібне інтеграційне тестування?"
topic: nodejs
grade: middle
category: "Тестування"
order: 69
difficulty: medium
---

## Відповідь

**Інтеграційні тести** перевіряють взаємодію компонентів: API + DB, API + Redis, сервіс + зовнішній мок.

Unit-тести не ловлять:
- Синтаксичні помилки SQL, проблеми міграцій
- Неправильний connection string / конфіг пулу
- Баги порядку middleware
- Невідповідності серіалізації (Date → JSON)
- Проблеми ізоляції транзакцій

Інструменти: Supertest + реальний/тестовий Postgres (Testcontainers), модуль `@nestjs/testing`.

## Приклад

```js
import { test } from 'node:test';
import request from 'supertest';
import { app, pool } from './app.js';

test.before(async () => {
  await pool.query('TRUNCATE users CASCADE');
});

test('POST /users persists to database', async () => {
  const res = await request(app)
    .post('/users')
    .send({ email: 'test@example.com' })
    .expect(201);

  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [res.body.id]);
  assert.equal(rows[0].email, 'test@example.com');
});
```

## Юз кейси

- Testcontainers Postgres у CI
- Тести шару репозиторію з реальним SQL
- Контракт API з увімкненим auth middleware

## Документація

- [Jest — Getting started](https://jestjs.io/docs/getting-started)
- [Testing pyramid — Martin Fowler](https://martinfowler.com/articles/practical-test-pyramid.html)
