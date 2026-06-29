---
title: "Де використовують патерн Revealing constructor (відкритий конструктор)?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 14
difficulty: medium
---

## Відповідь

Revealing Module / Revealing Constructor — API повертається через factory, а `new` заборонено або приховано. У Node ecosystem: `Promise` (не `new Promise()` без executor — але конструктор публічний), бібліотеки з `Something.create()` замість `new Something()`. Патерн захищає інваріанти: об'єкт створюється лише після async init (DB connection pool). Реалізація: перевірка `new.target`, Symbol.hasInstance, або private constructor (TS). У Node core: `Error.captureStackTrace` + custom factory для stack hygiene.

## Приклад

```js
class DbPool {
  constructor() {
    if (new.target) throw new Error('Use DbPool.connect()');
  }
  static async connect(url) {
    const conn = await openConnection(url);
    return Object.assign(Object.create(DbPool.prototype), { conn });
  }
}

// const bad = new DbPool(); // Error
const pool = await DbPool.connect(process.env.DATABASE_URL);
```

## Юз кейси

- Async initialization (cannot construct before ready)
- Immutable handles (streams, sockets)
- Library API design — prevent `new` misuse

## Документація

- [Revealing Module Pattern](https://www.patterns.dev/vanilla/module-pattern/)
