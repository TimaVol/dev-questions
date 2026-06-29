---
title: "Яка мета створення abstract class?"
topic: frontend
grade: middle
category: "JavaScript"
order: 57
difficulty: medium
---

## Відповідь

Abstract class — не інстанціюється, задає контракт + часткову реалізацію. На відміну від interface — може мати implemented methods. Для спільної логіки в ієрархії.

## Приклад

```ts
abstract class BaseStore {
  protected items: Item[] = [];
  abstract load(): Promise<void>;
  get count() { return this.items.length; }
}
class ProductStore extends BaseStore {
  async load() { this.items = await fetchProducts(); }
}
```

## Юз кейси

- Base class для CRUD stores
- Shared logic + abstract fetch
- Template method pattern

## Документація

- [Classes — TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html)
