---
title: "Поясніть кожну складову SOLID."
topic: frontend
grade: middle
category: "Загальні запитання"
order: 2
difficulty: medium
---

## Відповідь

- **S** — одна причина для змін
- **O** — розширення без модифікації
- **L** — підклас замінює батьківський
- **I** — вузькі інтерфейси
- **D** — залежність від абстракцій, не реалізацій

## Приклад

```ts
interface CartStorage { save(items: CartItem[]): void; }
class LocalCartStorage implements CartStorage {
  save(items) { localStorage.setItem('cart', JSON.stringify(items)); }
}
class CartService {
  constructor(private storage: CartStorage) {}
  checkout(items: CartItem[]) { this.storage.save(items); }
}
```

## Юз кейси

- Розбиття «божественного» компонента
- Підміна API-клієнта моком у тестах
- Архітектурне рев'ю перед масштабуванням команди

## Документація

- [SOLID — Wikipedia](https://en.wikipedia.org/wiki/SOLID)
- [SOLID design principles — refactoring.guru](https://refactoring.guru/design-principles)
