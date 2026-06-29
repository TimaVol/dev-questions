---
title: "Як можна створити singleton за допомогою системи модульності у Node.js?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 36
difficulty: hard
---

## Відповідь

CJS/ESM **module cache** — перший `import`/`require` виконує module, наступні отримують той самий об'єкт `exports`. Патерн: створити instance на top-level модуля і export. Один process = один singleton. **ESM:** top-level await для async init singleton. Обережно: **tests** — `jest.resetModules()` або DI замість global singleton; **cluster** — кожен worker має свій instance; **hot reload** — invalidate cache. Антипатерн: mutable global state без interface.

## Приклад

```js
// db.js — module singleton
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export function getPool() {
  return pool;
}

// app.js
import { getPool } from './db.js';
import { getPool as getPool2 } from './db.js';
console.log(getPool() === getPool2()); // true
```

## Юз кейси

- Пул з'єднань БД на process
- Config loader / feature flags client
- Logger instance зі спільними transports

## Документація

- [ES modules — Node.js](https://nodejs.org/api/esm.html)
- [Singleton pattern](https://refactoring.guru/design-patterns/singleton)
