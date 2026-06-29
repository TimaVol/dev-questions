---
title: "Навіщо писати тести?"
topic: nodejs
grade: middle
category: "Тестування"
order: 67
difficulty: medium
---

## Відповідь

Тести дають:

- **Confidence** при refactor і deploy
- **Documentation** — tests показують expected behavior
- **Early bug detection** — дешевше fix до production
- **Design feedback** — hard-to-test code = bad coupling
- **Regression prevention** — старі bugs не повертаються

Для Node.js backend: unit (business logic), integration (DB/API), contract (microservices), e2e (critical flows). CI блокує merge без green tests.

ROI найвищий на business-critical paths: payments, auth, data integrity.

## Приклад

```js
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateDiscount } from './pricing.js';

describe('calculateDiscount', () => {
  it('applies 10% for premium users', () => {
    assert.equal(calculateDiscount(100, { tier: 'premium' }), 90);
  });

  it('throws for negative amount', () => {
    assert.throws(() => calculateDiscount(-1, {}), /invalid amount/);
  });
});
```

## Юз кейси

- TDD для pricing rules
- Snapshot tests для API response shape
- CI gate: 80% coverage on core modules

## Документація

- [Jest — Getting started](https://jestjs.io/docs/getting-started)
