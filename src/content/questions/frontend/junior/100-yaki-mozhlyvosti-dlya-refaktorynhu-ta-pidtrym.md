---
title: "Які можливості для рефакторингу та підтримки коду надає TypeScript?"
topic: frontend
grade: junior
category: "TypeScript"
order: 100
difficulty: easy
---

## Відповідь

Rename symbol оновлює всі використання. Go to definition, find references, inline type hints. Зміна інтерфейсу — компілятор покаже всі зламані місця замість runtime-багів.

## Приклад

```ts
// Перейменував User → Account — IDE оновить імпорти
interface Account { id: string; email: string; }
function sendEmail(user: Account) { /* ... */ }
```

## Юз кейси

- Rename поля в API-моделі по всьому проєкту
- Видалення deprecated-методу — компілятор знайде всі виклики

## Документація

- [TypeScript for JS Programmers — TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
