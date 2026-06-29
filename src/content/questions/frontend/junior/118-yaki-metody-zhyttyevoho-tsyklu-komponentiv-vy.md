---
title: "Які методи життєвого циклу компонентів ви знаєте?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 118
difficulty: easy
---

## Відповідь

У класових компонентах: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`. У функціональних — хуки: `useEffect` з deps замінює lifecycle, cleanup у return.

## Приклад

```jsx
useEffect(() => {
  const sub = api.subscribe();
  return () => sub.unsubscribe(); // cleanup = unmount
}, []);
```

## Юз кейси

- `useEffect([], ...)` — fetch при mount
- Cleanup — відписка від WebSocket при unmount

## Документація

- [useEffect — React](https://react.dev/reference/react/useEffect)
