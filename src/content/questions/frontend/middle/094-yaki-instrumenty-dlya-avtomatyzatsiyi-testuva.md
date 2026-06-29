---
title: "Які інструменти для автоматизації тестування знаєте?"
topic: frontend
grade: middle
category: "Тести"
order: 94
difficulty: medium
---

## Відповідь

**Vitest/Jest** — unit і integration. **Testing Library** — тести з погляду користувача (`getByRole`). **Playwright/Cypress** — e2e у реальному браузері. **MSW** — mock HTTP на рівні мережі. **GitHub Actions** — CI pipeline. **Storybook** — візуальна ізоляція компонентів.

## Приклад

```js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

render(<LoginForm />);
await userEvent.click(screen.getByRole('button', { name: 'Увійти' }));
```

## Юз кейси

- Vitest + RTL для компонентів форми
- Playwright для smoke-тесту checkout
- MSW для mock REST API у frontend-тестах

## Документація

- [Playwright — Docs](https://playwright.dev/docs/intro)
- [Cypress — Docs](https://docs.cypress.io/guides/overview/why-cypress)
