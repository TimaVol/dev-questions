---
title: "Як використовуєте архітектурні патерни (наприклад, Flux або Redux) для ефективного управління станом у React-застосунку? Які переваги та обмеження бачите в застосуванні цих патернів?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 82
difficulty: medium
---

## Відповідь

Flux — односпрямований потік даних: action → dispatcher → store → view. Redux/RTK — передбачуваний глобальний стан, DevTools, middleware для async. Zustand — простіший, менше boilerplate. Не все в Redux — лише справді спільний складний стан; локальний UI залишаю в компонентах.

## Приклад

```ts
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as CartItem[] },
  reducers: {
    addItem: (state, action) => { state.items.push(action.payload); },
  },
});
```

## Юз кейси

- RTK для checkout flow з кількома кроками
- Middleware для логування API-запитів у dev
- Zustand для простого UI-стану (sidebar open/closed)

## Документація

- [Managing state — React](https://react.dev/learn/managing-state)
- [Composition — React](https://react.dev/learn/passing-data-deeply-with-context)
