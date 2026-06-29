---
title: "Що таке type guard?"
topic: frontend
grade: middle
category: "JavaScript"
order: 56
difficulty: medium
---

## Відповідь

Type guard — функція, що звужує тип: `function isUser(x): x is User`. `typeof`, `in`, `instanceof`, custom predicates. Після if TypeScript знає точний тип.

## Приклад

```ts
function isApiError(r: User | ApiError): r is ApiError {
  return 'error' in r;
}
if (isApiError(result)) console.log(result.error);
else console.log(result.name);
```

## Юз кейси

- Discriminated union з type guard
- Runtime validation + TS narrowing
- Parse unknown API response

## Документація

- [Narrowing — TypeScript](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
