---
title: "Які види тестування знаєте?"
topic: frontend
grade: middle
category: "Тести"
order: 92
difficulty: medium
---

## Відповідь

**Unit** — ізольований модуль, мілісекунди. **Integration** — кілька модулів разом (форма + API mock). **E2E** — повний сценарій у браузері, повільні й крихкі. Також: smoke, regression, visual, performance. Піраміда: багато unit, менше integration, мінімум e2e на критичні шляхи.

## Приклад

```text
        /   e2e   \         ← мало, повільні
       / integration \      ← середньо
      /  unit tests    \     ← багато, швидкі
```

## Юз кейси

- Unit для `formatPrice` і валідаторів email
- Integration: форма логіну + MSW mock API
- E2E: login → додати в кошик → checkout

## Документація

- [Testing pyramid — Martin Fowler](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Jest — Getting started](https://jestjs.io/docs/getting-started)
