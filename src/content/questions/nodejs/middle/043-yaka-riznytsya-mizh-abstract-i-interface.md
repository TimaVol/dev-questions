---
title: "Яка різниця між abstract і interface?"
topic: nodejs
grade: middle
category: "JavaScript"
order: 43
difficulty: easy
---

## Відповідь

У **TypeScript** (типовий стек NestJS):

**Interface** — контракт: описує форму об'єкта. Лише на етапі компіляції, не існує в runtime. Підтримує declaration merging. Клас implements interface.

**Abstract class** — може мати реалізацію + абстрактні методи. Не можна інстанціювати. Підтримує модифікатори доступу, конструктори, статичні члени.

Коли що:
- Interface — DI-токени, контракти репозиторіїв, форми DTO
- Abstract class — спільна базова логіка (наприклад, BaseRepository з типовим CRUD)

У чистому JS — ні того, ні іншого; TypeScript додає обидва.

## Приклад

```ts
interface PaymentGateway {
  charge(amount: number, token: string): Promise<string>;
}

abstract class BaseRepository<T> {
  constructor(protected readonly db: DataSource) {}
  abstract findById(id: string): Promise<T | null>;

  protected log(action: string) {
    console.log(`[${this.constructor.name}] ${action}`);
  }
}

class StripeGateway implements PaymentGateway {
  async charge(amount: number, token: string) {
    return 'ch_xxx';
  }
}
```

## Юз кейси

- NestJS: interface для моків у тестах
- Abstract BaseService зі спільною обробкою помилок
- Розділення інтерфейсів для контрактів мікросервісів

## Документація

- [Classes — TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html)
