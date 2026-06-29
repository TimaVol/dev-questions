---
title: "Чи є у вас досвід покриття великих систем тестами?"
topic: frontend
grade: senior
category: "Тестування"
order: 74
difficulty: hard
---

## Відповідь

Стратегія тестування великої системи: **risk-based coverage** — критичні шляхи (auth, payment, checkout) отримують e2e; utils/hooks — unit; components — integration. **Testing trophy** замість pyramid ice-cream. Інкрементально: characterisation tests перед legacy refactor; **MSW** для API layer; **contract tests** з Pact для frontend/backend. Метрики: не 100% line coverage — відстежувати critical flow coverage. Політика flaky tests: quarantine + fix протягом sprint. Senior володіє test strategy doc і CI gates.

## Приклад

Coverage map for e-commerce:

| Area | Unit | Integration | E2E |
|------|------|-------------|-----|
| formatPrice | ✅ | — | — |
| useCart hook | ✅ | ✅ | — |
| CheckoutForm | — | ✅ | ✅ |
| Payment redirect | — | — | ✅ |

MSW handlers shared unit + integration:

```ts
// mocks/handlers.ts
export const handlers = [
  http.get('/api/orders', () => HttpResponse.json([{ id: 1, total: 999 }])),
];
```

Strangler refactor test:

```ts
// characterisation test — locks legacy behavior before rewrite
it('legacy discount matches spec', () => {
  expect(calculateDiscountLegacy({ qty: 5, tier: 'gold' })).toMatchSnapshot();
});
```

## Юз кейси

- Legacy module rewrite: snapshot + integration tests, потім refactor з green CI
- Monorepo на 50 devs: affected tests лише через Turborepo `--filter=...[origin/main]`
- Production bug: regression test перед merge hotfix

## Документація

- [Vitest — Getting started](https://vitest.dev/guide/)
- [Playwright — Best practices](https://playwright.dev/docs/best-practices)
