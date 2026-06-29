---
title: "Як ви управляєте станами в React APP? Як передавати стани між кількома компонентами?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 77
difficulty: medium
---

## Відповідь

Локальний UI-стан — `useState`/`useReducer` у компоненті. Спільний між сусідами — lift state up. Глибоке дерево — Context (рідкі оновлення) або Zustand/Redux. Серверний стан — React Query/SWR, не дублювати в Redux. Правило: стан якомога ближче до місця використання.

## Приклад

```tsx
import { create } from 'zustand';

const useCart = create((set) => ({
  items: [] as CartItem[],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
}));
```

## Юз кейси

- Context для теми й локалі (рідко змінюється)
- Zustand для кошика в e-commerce
- React Query для даних API — без ручного кешу в useState

## Документація

- [Hooks — React](https://react.dev/reference/react/hooks)
- [Context — React](https://react.dev/learn/passing-data-deeply-with-context)
