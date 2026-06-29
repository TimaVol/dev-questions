---
title: "Як можна отримати інкапсуляцію всередині класу без використання Typescript?"
topic: nodejs
grade: senior
category: "JavaScript"
order: 33
difficulty: hard
---

## Відповідь

JavaScript (ES2022+) має **private fields** `#field` — перевірка на етапі парсингу, недоступні ззовні. Патерн **WeakMap** — приватні дані в WeakMap на рівні модуля з ключем instance (legacy-підхід).

**Closures** у factory functions — справжня приватність без класу. **Symbols** як псевдо-приватні keys (приховування, не безпека). Module scope — не експортувати внутрішні helpers.

Без TS: `#balance`, `#validate()` — переважний варіант. Не покладатися на конвенцію `_underscore` — це не enforcement.

## Приклад

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) throw new Error('Invalid amount');
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.#balance; // SyntaxError
```

```js
// Module closure pattern
const balances = new WeakMap();

export function createAccount(initial) {
  const state = { balance: initial };
  balances.set(state, true);
  return {
    deposit(n) { state.balance += n; },
    balance() { return state.balance; },
  };
}
```

## Юз кейси

- Domain entity з забезпеченням інваріантів
- Приховування внутрішнього кешу від публічного API класу
- Дизайн бібліотеки без exposure mutable internals

## Документація

- [Private class fields — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties)
- [Classes — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Classes)
