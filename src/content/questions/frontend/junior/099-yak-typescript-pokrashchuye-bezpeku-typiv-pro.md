---
title: "Як TypeScript покращує безпеку типів проти JavaScript?"
topic: frontend
grade: junior
category: "TypeScript"
order: 99
difficulty: medium
---

## Відповідь

TS перевіряє типи до запуску: неправильні аргументи, відсутні поля, null без перевірки — все це помилка компіляції. `strict` mode вмикає суворіші правила.

## Приклад

```ts
function getLength(s: string) { return s.length; }
// getLength(null);        // помилка
// getLength(undefined);   // помилка
```

## Юз кейси

- `strictNullChecks` — змусити обробити null/undefined
- Типізація API — не звернутись до неіснуючого поля

## Документація

- [TypeScript intro — TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Everyday types — TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
