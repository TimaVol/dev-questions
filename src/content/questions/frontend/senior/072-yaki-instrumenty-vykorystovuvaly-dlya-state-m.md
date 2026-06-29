---
title: "Які інструменти використовували для state management і чому обирали саме їх?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 72
difficulty: medium
---

## Відповідь

Рішення залежить від складності та команди. **Zustand** — мінімум boilerplate, selectors, без Provider, добре для UI state. **Redux Toolkit** — великі команди, суворі патерни, DevTools, middleware, time-travel. **Jotai/Recoil** — atomic fine-grained updates. **React Query** — server state (доповнення, не заміна). **XState** — складні flows (checkout, wizards). **Context** — лише theme/locale. Senior формулює trade-off: «Redux overkill для 3 полів → Zustand; regulatory audit trail → Redux action log».

## Приклад

Zustand cart store:

```ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartStore = {
  items: CartItem[];
  add: (item: CartItem) => void;
  total: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => set(s => ({ items: [...s.items, item] })),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    { name: 'cart-v1' }
  )
);

// selector — component re-renders only when total changes
const total = useCart(s => s.total());
```

## Юз кейси

- Startup MVP: Zustand + React Query — швидкий ship
- Fintech dashboard: Redux Toolkit + RTK Query — передбачувані, auditable actions
- Multi-step form: XState machine — явні states замість boolean soup

## Документація

- [Managing state — React](https://react.dev/learn/managing-state)
- [TanStack Query — Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
