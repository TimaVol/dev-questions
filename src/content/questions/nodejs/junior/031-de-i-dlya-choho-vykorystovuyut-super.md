---
title: "Де і для чого використовують super()?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 31
difficulty: easy
---

## Відповідь

`super` у класах ES6 викликає конструктор або методи батьківського класу. У **derived class** перед використанням `this` обов'язково `super(...args)` — інакше ReferenceError. `super.method()` — делегування до prototype батька. Потрібен для наслідування та повторного використання логіки базового класу.

## Приклад

```js
class Repository {
  constructor(db) { this.db = db; }
  async findById(id) { return this.db.query('SELECT * FROM t WHERE id=$1', [id]); }
}

class UserRepository extends Repository {
  constructor(db) {
    super(db); // обов'язково до this
  }
  async findByEmail(email) {
    return this.db.query('SELECT * FROM users WHERE email=$1', [email]);
  }
}
```

## Юз кейси

- Базовий `BaseService` з логуванням, дочірні — доменна логіка
- ORM-моделі з спільними timestamps (`createdAt`)
- Перевизначення методу з викликом `super.save()`

## Документація

- [super — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)
