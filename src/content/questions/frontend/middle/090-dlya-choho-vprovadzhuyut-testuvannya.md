---
title: "Для чого впроваджують тестування?"
topic: frontend
grade: middle
category: "Тести"
order: 90
difficulty: easy
---

## Відповідь

Тести ловлять регресії до продакшену, документують очікувану поведінку й дають впевненість при рефакторингу. CI блокує merge без проходження тестів. Найвищий ROI — на бізнес-логіці, валідаторах і критичних user flows (оплата, auth).

## Приклад

```js
import { calcDiscount } from './pricing';

test('знижка 10% для VIP-клієнта', () => {
  expect(calcDiscount(100, 'vip')).toBe(90);
});
```

## Юз кейси

- CI gate: PR не мержиться без зелених тестів
- Regression test після виправлення бага в розрахунку доставки
- Покриття pricing logic — найкритичніша зона e-commerce

## Документація

- [Jest — Getting started](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/)
