---
title: "Яким чином ви б протестували складний запит до бази даних у класі репозиторію?"
topic: nodejs
grade: middle
category: "Тестування"
order: 73
difficulty: medium
---

## Відповідь

Стратегія для complex repository query:

- **Integration test з real DB** (Testcontainers Postgres) — перевірити SQL correctness
- **Seed fixtures** — known data set перед test
- **Assert на structure і counts**, не exact timestamps
- **Edge cases**: empty result, pagination boundary, NULL handling
- **Explain analyze** (optional) — performance regression check
- Unit test лише для query builder logic без DB

Не mock SQL driver для integration — mock ловить syntax errors.

## Приклад

```js
import { PostgreSqlContainer } from '@testcontainers/postgresql';

let pool, repo;

before(async () => {
  const container = await new PostgreSqlContainer().start();
  pool = new Pool({ connectionString: container.getConnectionUri() });
  await migrate(pool);
  repo = new OrderRepository(pool);
  await seedOrders(pool);
});

test('findOverdueOrders returns only unpaid past due date', async () => {
  const overdue = await repo.findOverdueOrders({ limit: 10 });

  assert.ok(overdue.every((o) => o.status === 'pending'));
  assert.ok(overdue.every((o) => new Date(o.dueDate) < new Date()));
  assert.equal(overdue.length, 2); // seeded exactly 2 overdue
});
```

## Юз кейси

- Complex JOIN + aggregation report query
- Cursor pagination correctness
- Transaction rollback behavior in repository

## Документація

- [Jest — Mock functions](https://jestjs.io/docs/mock-functions)
- [PostgreSQL — SELECT](https://www.postgresql.org/docs/current/sql-select.html)
