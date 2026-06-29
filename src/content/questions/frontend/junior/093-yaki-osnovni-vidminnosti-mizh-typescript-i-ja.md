---
title: "Які основні відмінності між TypeScript і JavaScript?"
topic: frontend
grade: junior
category: "TypeScript"
order: 93
difficulty: medium
---

## Відповідь

TypeScript — надмножина JS зі статичною типізацією. Код компілюється в JS. TS ловить помилки типів на етапі компіляції, дає автодоповнення і рефакторинг у IDE.

## Приклад

```ts
function greet(name: string): string {
  return `Привіт, ${name}`;
}
// greet(42); // помилка компіляції
```

## Юз кейси

- Типізація API-відповідей від бекенду
- Безпечний рефакторинг великого кодової бази

## Документація

- [TypeScript intro — TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
