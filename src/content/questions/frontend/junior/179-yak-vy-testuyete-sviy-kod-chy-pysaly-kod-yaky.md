---
title: "Як ви тестуєте свій код? Чи писали код, який не можна було покрити тестами?"
topic: frontend
grade: junior
category: "Тестування"
order: 179
difficulty: easy
---

## Відповідь

Unit-тести (Vitest/Jest) на utils і hooks, integration на компоненти (Testing Library), E2E (Playwright) на критичні flows. Важко тестувати — tightly coupled код, прямий DOM без abstraction; рішення — винести логіку.

## Приклад

```js
import { render, screen } from '@testing-library/react';
test('shows error on invalid email', () => {
  render(<LoginForm />);
  fireEvent.click(screen.getByRole('button', { name: 'Увійти' }));
  expect(screen.getByText(/невалідний email/i)).toBeInTheDocument();
});
```

## Юз кейси

- Unit test на `formatPrice()` — чиста функція
- E2E — flow checkout від кошика до підтвердження
