---
title: "Як організовувати тестові дані та робити їх відповідними до різних сценаріїв тестування?"
topic: frontend
grade: senior
category: "Тестування"
order: 76
difficulty: medium
---

## Відповідь

Шари test data: **factories** (faker/builders) для unit/integration; **fixtures** (JSON files) для стабільних snapshots; **seed scripts** для e2e staging DB; **MSW handlers** на сценарій (порожній список, error 500, slow response). Принципи: детермінізм у CI (seeded faker), ізоляція на тест (без спільного mutable state), реалістичні edge cases (порожній рядок, unicode, max int). Не використовувати production data — GDPR. Версіонувати fixtures з schema migrations.

## Приклад

```ts
import { faker } from '@faker-js/faker';

faker.seed(42); // deterministic in CI

export function buildUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    role: 'user',
    ...overrides,
  };
}

// Scenario-specific MSW
export const emptyCatalogHandler = http.get('/api/products', () =>
  HttpResponse.json({ items: [], total: 0 })
);

export const serverErrorHandler = http.post('/api/checkout', () =>
  HttpResponse.json({ message: 'Server error' }, { status: 500 })
);
```

E2E seed:

```bash
npm run db:seed:test  # creates user test@example.com / password123
```

## Юз кейси

- Pagination test: factory будує 25 items, assert page 2 показує items 11–20
- Error state UI: MSW повертає 503 — skeleton → error banner
- i18n test: fixture з Arabic RTL product names

## Документація

- [MSW — Getting started](https://mswjs.io/docs/getting-started)
- [JSON — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
