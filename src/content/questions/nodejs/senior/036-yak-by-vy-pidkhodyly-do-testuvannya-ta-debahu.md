---
title: "Як би ви підходили до тестування та дебагу застосунку з мікросервісною архітектурою у Node.js?"
topic: nodejs
grade: senior
category: "Мікросервіси"
order: 36
difficulty: hard
---

## Відповідь

**Піраміда тестування**: unit (domain logic, mocked repos) → integration (реальна БД у Testcontainers) → contract tests (Pact між consumer/producer) → обмежений E2E (лише критичні шляхи).

**Локальна розробка**: Docker Compose із залежностями; service stubs/wiremock для зовнішніх API. **CI**: паралельні test suites на сервіс; smoke tests після деплою.

**Дебаг розподілених систем**: correlation ID у логах усіх сервісів; replay trace у Jaeger; агрегація логів (Loki) за traceId. Відтворення — record/replay продакшен-трафіку (санітизованого) або chaos engineering у staging.

Уникайте: E2E на все (flaky, повільно); спільна staging БД між командами.

## Приклад

```js
// Pact consumer test sketch
await provider.addInteraction({
  state: 'user exists',
  uponReceiving: 'get user by id',
  withRequest: { method: 'GET', path: '/users/1' },
  willRespondWith: { status: 200, body: { id: 1, name: 'Ann' } },
});
```

## Юз кейси

- Дебаг каскаду 500 через 4 сервіси за одним traceId
- Contract test падає при зміні форми відповіді payment API
- Testcontainers PostgreSQL для integration tests у CI

## Документація

- [Diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics)
- [Jest — Getting started](https://jestjs.io/docs/getting-started)
