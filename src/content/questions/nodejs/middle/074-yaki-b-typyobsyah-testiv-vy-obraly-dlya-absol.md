---
title: "Які б типи/обсяг тестів ви обрали для абсолютно нової системи без будь-яких обмежень з боку замовника?"
topic: nodejs
grade: middle
category: "Тестування"
order: 74
difficulty: medium
---

## Відповідь

Для greenfield Node.js-системи з необмеженим бюджетом:

**Unit (60–70%)** — вся бізнес-логіка: сервіси, валідатори, мапери, правила автентифікації. Jest/Vitest/node:test, TDD де можливо.

**Integration (20–30%)** — репозиторії з Testcontainers (Postgres, Redis), API-маршрути з Supertest + реальний стек middleware.

**Contract tests** — Pact між мікросервісами, consumer-driven контракти.

**E2E (5–10%)** — критичні сценарії: auth, основний CRUD, оплата. Playwright або окремий e2e-набір.

**Нефункціональні**: навантажувальні тести (k6), безпека (OWASP ZAP), chaos engineering (пізніша стадія).

CI: кожен PR — unit + integration; щоночі — e2e + load; перед релізом — повна регресія.

## Приклад

```
Coverage targets:
  services/     → 90% line coverage
  repositories/ → integration tests per method
  routes/       → supertest per endpoint + auth matrix
  e2e/          → 15 scenarios max, tagged @critical
```

## Юз кейси

- Contract-тести перед виділенням мікросервісу
- Mutation testing (Stryker) на модулі ціноутворення
- Базовий рівень продуктивності в CI з порогами k6

## Документація

- [Testing pyramid — Martin Fowler](https://martinfowler.com/articles/practical-test-pyramid.html)
