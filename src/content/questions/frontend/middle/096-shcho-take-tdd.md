---
title: "Що таке TDD?"
topic: frontend
grade: middle
category: "Тести"
order: 96
difficulty: easy
---

## Відповідь

TDD (Test-Driven Development) — спочатку пишу failing test, потім мінімальний код, щоб пройти (Green), потім рефакторинг. Тест описує бажану поведінку до реалізації. Покращує дизайн API функцій і запобігає регресіям, але вимагає дисципліни.

## Приклад

```js
// Red
test('додає товар у кошик', () => {
  const cart = createCart();
  cart.add({ id: '1', qty: 2 });
  expect(cart.items).toHaveLength(1);
});

// Green → Refactor
```

## Юз кейси

- Нова utility-функція з чіткими edge cases
- Bug fix: спочатку тест, що відтворює баг, потім fix
- Парсер або валідатор з багатьма правилами

## Документація

- [Test-driven development — Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)
