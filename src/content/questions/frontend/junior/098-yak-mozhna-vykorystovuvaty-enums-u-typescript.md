---
title: "Як можна використовувати Enums у TypeScript і які їхні переваги?"
topic: frontend
grade: junior
category: "TypeScript"
order: 98
difficulty: medium
---

## Відповідь

Enum — іменований набір констант. String enum зручніший за numeric (не залежить від порядку). Альтернатива — union type рядків, який часто кращий у сучасному TS.

## Приклад

```ts
enum OrderStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
}
function isDone(s: OrderStatus) {
  return s === OrderStatus.Delivered;
}
```

## Юз кейси

- Статуси замовлення з автодоповненням у IDE
- Заміна magic strings на іменовані константи

## Документація

- [Enums — TypeScript](https://www.typescriptlang.org/docs/handbook/enums.html)
