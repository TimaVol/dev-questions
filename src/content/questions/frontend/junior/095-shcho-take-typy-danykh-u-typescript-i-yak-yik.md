---
title: "Що таке типи даних у TypeScript і як їх використовують?"
topic: frontend
grade: junior
category: "TypeScript"
order: 95
difficulty: easy
---

## Відповідь

TS додає типи: `string`, `number`, `boolean`, `array`, `tuple`, `enum`, `any`, `unknown`, `never`, union (`string | number`), intersection. Типи ставляться на змінні, параметри, return value.

## Приклад

```ts
let count: number = 0;
const ids: number[] = [1, 2, 3];
type Status = 'active' | 'inactive';
```

## Юз кейси

- Union type для статусу замовлення
- `readonly` масив для константних списків

## Документація

- [TypeScript intro — TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
