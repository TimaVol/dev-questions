---
title: "Як працюють Generics у TypeScript і чому вони корисні?"
topic: frontend
grade: junior
category: "TypeScript"
order: 97
difficulty: medium
---

## Відповідь

Generics — параметри типу для перевикористання коду з різними типами без втрати type safety. `T` — placeholder типу, підставляється при виклику.

## Приклад

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const n = first([1, 2, 3]);    // number
const s = first(['a', 'b']);   // string
```

## Юз кейси

- Універсальна функція `wrapInArray<T>(value: T): T[]`
- `Promise<User>` замість просто `Promise`

## Документація

- [Generics — TypeScript](https://www.typescriptlang.org/docs/handbook/2/generics.html)
