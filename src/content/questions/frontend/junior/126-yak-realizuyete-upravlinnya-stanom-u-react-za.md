---
title: "Як реалізуєте управління станом у React-застосунках? Які підходи використовуєте для підтримки читабельності та ефективного управління більш складним/глобальним станом?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 126
difficulty: medium
---

## Відповідь

Локальний стан — `useState`/`useReducer`. Глобальний — Context, Zustand або Redux Toolkit. Серверний стан — React Query. Правило: тримай стан якомога ближче до місця використання.

## Приклад

```jsx
import { create } from 'zustand';
const useCart = create((set) => ({
  items: [],
  add: (item) => set(s => ({ items: [...s.items, item] })),
}));
```

## Юз кейси

- `useState` — форма, toggle, локальний UI
- Zustand — кошик, авторизація на всьому сайті

## Документація

- [Managing state — React](https://react.dev/learn/managing-state)
