---
title: "Як варто автоматизовувати тестування? Які інструменти та мови скриптів використовуєте?"
topic: frontend
grade: senior
category: "Тестування"
order: 78
difficulty: hard
---

## Відповідь

Стек (TypeScript скрізь): **Vitest** unit/integration, **RTL** components, **MSW** API mock, **Playwright** e2e (краще за Cypress для speed/debug), **Storybook + test-runner** або Chromatic interaction tests, **axe-core** a11y. Scripts у `package.json`, оркестрація через CI. Pre-commit: lint-staged запускає related tests (`vitest related`). Property-based: **fast-check** для utils. Contract: **Pact** опційно. Мова: TypeScript — ті самі types, що в app, менше context switch.

## Приклад

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "test:a11y": "vitest run --config vitest.a11y.config.ts",
    "test:storybook": "test-storybook"
  }
}
```

Vitest + RTL:

```ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

it('shows empty state', () => {
  render(<OrderList orders={[]} />);
  expect(screen.getByText(/немає замовлень/i)).toBeInTheDocument();
});
```

Playwright:

```ts
import { test, expect } from '@playwright/test';
test('add to cart', async ({ page }) => {
  await page.goto('/products/1');
  await page.getByRole('button', { name: 'До кошика' }).click();
  await expect(page.getByTestId('cart-count')).HaveText('1');
});
```

## Юз кейси

- MSW у Vitest: ті самі handlers, що в Storybook — один mock source
- Playwright codegen: bootstrap e2e для нової feature за 10 хв
- CI parallel: `--shard=1/4` для Playwright на 4 workers

## Документація

- [Vitest — Getting started](https://vitest.dev/guide/)
- [Playwright — Getting started](https://playwright.dev/docs/intro)
