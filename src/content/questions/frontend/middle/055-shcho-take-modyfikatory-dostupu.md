---
title: "Що таке модифікатори доступу?"
topic: frontend
grade: middle
category: "JavaScript"
order: 55
difficulty: easy
---

## Відповідь

TS: `public`, `private`, `protected`, `#field` (runtime private). JS без TS — лише convention `_private`. Інкапсуляція логіки класу.

## Приклад

```ts
class BankAccount {
  #balance = 0;
  deposit(amount: number) {
    if (amount > 0) this.#balance += amount;
  }
  getBalance() { return this.#balance; }
}
```

## Юз кейси

- Приховати internal state класу
- Захист від прямого доступу до balance
- API surface класу

## Документація

- [Private class features — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties)
- [Classes — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Classes)
