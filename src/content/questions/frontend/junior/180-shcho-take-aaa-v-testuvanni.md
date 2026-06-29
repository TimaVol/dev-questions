---
title: "Що таке ААА в тестуванні?"
topic: frontend
grade: junior
category: "Тестування"
order: 180
difficulty: easy
---

## Відповідь

Arrange-Act-Assert — структура unit-тесту. Arrange — підготовка даних. Act — виклик тестованої функції. Assert — перевірка результату.

## Приклад

```js
test('adds item to cart', () => {
  // Arrange
  const cart = createCart();
  const product = { id: 1, price: 100 };
  // Act
  cart.add(product);
  // Assert
  expect(cart.items).toHaveLength(1);
  expect(cart.total()).toBe(100);
});
```

## Юз кейси

- Стандартна структура кожного unit test
- Один assert на логічну перевірку — легше дебажити

## Документація

- [Jest — Getting started](https://jestjs.io/docs/getting-started)
