---
title: "У яких випадках використовуєте useReducer?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 88
difficulty: medium
---

## Відповідь

`useReducer` — коли стан має кілька пов’язаних полів і transitions (кошик, wizard, finite state machine). Reducer централізує логіку оновлення — легше тестувати, ніж кілька `setState`. Обираю замість `useState`, коли наступний стан залежить від попереднього або багато типів actions.

## Приклад

```tsx
type Action = { type: 'add'; item: Item } | { type: 'clear' };

function reducer(state: { items: Item[] }, action: Action) {
  switch (action.type) {
    case 'add': return { items: [...state.items, action.item] };
    case 'clear': return { items: [] };
    default: return state;
  }
}

const [state, dispatch] = useReducer(reducer, { items: [] });
```

## Юз кейси

- Багатокрокова форма з back/next і валідацією кроків
- Кошик: add, remove, clear, apply promo
- FSM для стану завантаження: idle → loading → success | error

## Документація

- [useReducer — React](https://react.dev/reference/react/useReducer)
- [Extracting state logic — React](https://react.dev/learn/extracting-state-logic-into-a-reducer)
