---
title: "Чи є у вас досвід кастомізації тестових утиліт під потреби проєкту."
topic: frontend
grade: senior
category: "Тестування"
order: 75
difficulty: medium
---

## Відповідь

Кастомні test utils зменшують boilerplate і закріплюють конвенції. Типові розширення: **custom render** з усіма providers (QueryClient, Router, Theme); **factory functions** для test data (`buildUser({ role: 'admin' })`); **MSW server setup** helper; **Playwright fixtures** для authenticated state; **matchers** (`toBeAccessible`). Vitest `setupFiles` для global config. Тримати utils тонкими — не ховати, що обгорнуто.

## Приклад

```tsx
// test/render.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

export function renderWithProviders(ui: ReactElement, { route = '/' } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
}

// test/factories.ts
export function buildOrder(overrides: Partial<Order> = {}): Order {
  return { id: 'ord_1', total: 1000, status: 'pending', ...overrides };
}
```

Playwright auth fixture:

```ts
export const test = base.extend({
  authedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByRole('button', { name: 'Увійти' }).click();
    await use(page);
  },
});
```

## Юз кейси

- 200 component tests: один `renderWithProviders` — консистентний QueryClient config
- Factory `buildProduct()` — читабельні тести замість 20-рядкових inline objects
- axe accessibility: custom matcher `await expect(page).toPassAxe()` у Playwright

## Документація

- [Vitest — Getting started](https://vitest.dev/guide/)
- [Testing Library — React](https://testing-library.com/docs/react-testing-library/intro/)
