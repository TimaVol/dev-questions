---
title: "Як використовуєте модульність у JavaScript для організації вашого коду?"
topic: frontend
grade: middle
category: "JavaScript"
order: 62
difficulty: medium
---

## Відповідь

Один модуль — одна відповідальність: feature folders з colocation (`cart.service.ts`, `useCart.ts`, тести поруч). Публічний API експортую через `index.ts`, але без «barrel hell» — re-export усього підряд погіршує tree-shaking. Слідкую за circular dependencies через eslint-plugin-import.

## Приклад

```
features/cart/
  cart.service.ts
  cart.types.ts
  useCart.ts
  cart.test.ts
  index.ts   # лише публічні експорти
```

## Юз кейси

- Модуль `checkout` ізольований від `catalog`
- Colocation доменної логіки з UI-хуком
- Уникнення циклічних імпортів між `api` і `store`

## Документація

- [Modules — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
