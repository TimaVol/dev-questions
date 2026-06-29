---
title: "Чи потрібні бібліотеки для state management, якщо є бібліотеки для кешування (React Query/SWR) і React Context?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 62
difficulty: medium
---

## Відповідь

Розділяйте **server state** vs **client state**. React Query/SWR — server state (fetch, cache, invalidation, stale). Context — low-frequency global UI (theme, locale) — але re-render all consumers при change. **Zustand/Jotai/Redux** потрібні коли: часті updates багатьох unrelated components, complex client state (multi-step wizard, undo), DevTools/time-travel, middleware. Не потрібні для: server data (Query enough), 2–3 global flags (Context OK з split contexts). Anti-pattern: Redux для API cache duplication.

## Приклад

Split state layers:

```tsx
// Server state — React Query
const { data: orders } = useQuery({ queryKey: ['orders'], queryFn: fetchOrders });

// Client UI state — Zustand (no re-render unrelated trees)
const useUIStore = create<{ sidebarOpen: boolean; toggle: () => void }>((set) => ({
  sidebarOpen: false,
  toggle: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
}));

// Rare global — Context split
const ThemeContext = createContext<'light' | 'dark'>('light');
// NOT one giant AppContext with 20 fields
```

Decision matrix:

| State type | Tool |
|------------|------|
| API data | React Query |
| Form (local) | useState / RHF |
| Theme, i18n | Context |
| Cart, filters, UI | Zustand |

## Юз кейси

- E-commerce: Query для products, Zustand для cart + checkout step
- Dashboard filters: Zustand selectors — лише FilterBar re-renders
- Уникати: Context для cart — кожен addItem re-renderить усе app tree

## Документація

- [Managing state — React](https://react.dev/learn/managing-state)
- [Choosing state structure — React](https://react.dev/learn/choosing-the-state-structure)
