---
title: "Розкажіть про інтерфейси в TypeScript і наведіть приклади їх використання."
topic: frontend
grade: junior
category: "TypeScript"
order: 96
difficulty: easy
---

## Відповідь

`interface` описує форму об'єкта: поля, опціональні (`?`), методи. Можна розширювати через `extends`. Використовують для props, API-моделей, контрактів.

## Приклад

```ts
interface Product {
  id: number;
  name: string;
  price?: number;
}
function render(p: Product) {
  return `${p.name}: ${p.price ?? 0} ₴`;
}
```

## Юз кейси

- Типізація props React-компонента
- Контракт відповіді REST API

## Документація

- [Interfaces — TypeScript](https://www.typescriptlang.org/docs/handbook/2/objects.html)
