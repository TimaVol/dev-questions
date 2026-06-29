---
title: "Яка різниця між класом і абстрактним класом?"
topic: frontend
grade: junior
category: "Загальні питання"
order: 6
difficulty: easy
---

## Відповідь

Звичайний клас можна інстанціювати напряму. Абстрактний — ні: він задає контракт і спільну базу, а конкретні методи реалізують нащадки.

## Приклад

```ts
abstract class Storage {
  abstract save(key: string, data: unknown): void;
  abstract load(key: string): unknown;
}

class LocalStorageAdapter extends Storage {
  save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
  load(key) { return JSON.parse(localStorage.getItem(key) ?? 'null'); }
}
```

## Юз кейси

- Базовий клас для різних адаптерів зберігання (localStorage, IndexedDB)
- Спільний інтерфейс для платіжних провайдерів

## Документація

- [Classes — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Classes)
- [Abstract classes — TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)
