---
title: "Навіщо потрібне юніт-тестування?"
topic: nodejs
grade: middle
category: "Тестування"
order: 70
difficulty: medium
---

## Відповідь

**Unit tests** перевіряють окремі функції/класи в ізоляції (mock dependencies).

Цінність для Node.js backend:
- Швидкий feedback loop (milliseconds)
- Тестують edge cases без setup DB
- Документують business rules
- Дозволяють fearless refactor service layer
- Дешеві у підтримці порівняно з e2e

Що unit-тестувати: validators, mappers, pricing logic, permission checks, pure utilities. Не тестувати: framework internals, trivial getters.

## Приклад

```js
import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { UserService } from './user-service.js';

describe('UserService', () => {
  it('throws when email already exists', async () => {
    const repo = { findByEmail: mock.fn(async () => ({ id: '1' })) };
    const service = new UserService(repo);

    await assert.rejects(
      () => service.register({ email: 'exists@example.com' }),
      { message: 'Email taken' },
    );
  });
});
```

## Юз кейси

- Mock repository у service tests
- Parameterized tests для validation rules
- Run on every file save у watch mode

## Документація

- [Jest — Getting started](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/)
