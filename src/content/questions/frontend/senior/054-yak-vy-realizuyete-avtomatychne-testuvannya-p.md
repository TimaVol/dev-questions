---
title: "Як ви реалізуєте автоматичне тестування під час розробки? Які інструменти використовуєте для unit-тестування, інтеграційного тестування та тестування взаємодії?"
topic: frontend
grade: senior
category: "JavaScript"
order: 54
difficulty: medium
---

## Відповідь

Піраміда тестів: багато **unit** (швидкі, ізольовані), менше **integration** (кілька модулів разом), мало **e2e** (повний user flow). Unit: **Vitest/Jest** + Testing Library — тестуй поведінку, не implementation. Integration: API mocks (MSW), render з providers (QueryClient, Router). E2E: **Playwright** — cross-browser, trace on failure. CI: unit на кожен PR, e2e на main/staging. Pre-commit: lint + typecheck + related tests. Coverage — guide, не goal; 80% на utils, менше на glue code. Flaky tests = P0 bug у CI.

## Приклад

```ts
// Unit — Vitest + Testing Library
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartButton } from './CartButton';

test('shows item count after click', async () => {
  const onAdd = vi.fn();
  render(<CartButton count={0} onAdd={onAdd} />);
  await userEvent.click(screen.getByRole('button', { name: /додати/i }));
  expect(onAdd).toHaveBeenCalledOnce();
});
```

```ts
// Integration — MSW mock API
import { setupServer } from 'msw/node';
const server = setupServer(
  http.get('/api/products', () => HttpResponse.json([{ id: 1, name: 'Тест' }])),
);
```

```ts
// E2E — Playwright
test('checkout flow', async ({ page }) => {
  await page.goto('/cart');
  await page.getByRole('button', { name: 'Оформити' }).click();
  await expect(page).toHaveURL('/checkout/success');
});
```

## Юз кейси

- PR gate: Vitest unit <30s, Playwright smoke 3 critical paths
- Regression: visual snapshot (Chromatic) на design system components
- TDD для pricing logic: unit tests перед implementation

## Документація

- [Vitest — Getting started](https://vitest.dev/guide/)
- [Playwright — Getting started](https://playwright.dev/docs/intro)
