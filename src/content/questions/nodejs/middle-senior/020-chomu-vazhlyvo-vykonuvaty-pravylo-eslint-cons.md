---
title: "Чому важливо виконувати правило eslint: consistent-return з огляду на оптимізацію v8?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 20
difficulty: hard
---

## Відповідь

`consistent-return` вимагає: або завжди `return value`, або завжди `return;`/implicit undefined — не змішувати. V8 будує **internal function kind** (normal vs async vs generator) і **return type feedback** для TurboFan. Якщо функція іноді повертає `number`, іноді `undefined` без явного патерну — **polymorphic return** ускладнює inline caching і deoptimization. Async functions з missing return → `Promise<undefined>` vs `Promise<T>` — нестабільність типів. Явний `return undefined` або early returns одного типу допомагають JIT.

## Приклад

```js
// Погано для IC: іноді number, іноді implicit undefined
function parsePort(val) {
  if (val) return Number(val);
  // implicit undefined
}

// Краще: явний consistent type
function parsePort(val) {
  if (!val) return undefined;
  return Number(val);
}

// async — завжди повертай однорідний результат
async function fetchUser(id) {
  if (!id) return null;
  return db.findUser(id);
}
```

## Юз кейси

- Hot path functions у request handlers
- ESLint CI для performance-sensitive сервісів
- Уникнення тонких багів (`if (x) return foo` без else)

## Документація

- [V8 — Blog](https://v8.dev/blog)
- [ESLint — consistent-return](https://eslint.org/docs/latest/rules/consistent-return)
