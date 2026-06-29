---
title: "У чому різниця між е2е та unit-тестами?"
topic: frontend
grade: middle
category: "Тести"
order: 93
difficulty: easy
---

## Відповідь

Unit-тест перевіряє одну функцію або компонент із моками — швидкий, детальний, сотні за секунди. E2E імітує реального користувача в браузері — повільний, покриває інтеграцію всіх шарів, але крихкий (flaky). Unit — фундамент піраміди; e2e — лише на критичні business paths.

## Приклад

```js
// Unit
expect(formatPrice(99.9)).toBe('99,90 ₴');

// E2E (Playwright)
await page.goto('/login');
await page.getByLabel('Email').fill('user@test.com');
await page.getByRole('button', { name: 'Увійти' }).click();
await expect(page).toHaveURL('/dashboard');
```

## Юз кейси

- Unit для `calcTax` з різними зонами
- E2E для повного auth flow
- Менше e2e — менше flaky і швидший CI

## Документація

- [Testing pyramid — Martin Fowler](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Testing Library](https://testing-library.com/docs/)
