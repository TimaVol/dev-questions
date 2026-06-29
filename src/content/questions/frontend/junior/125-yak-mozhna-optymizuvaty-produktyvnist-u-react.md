---
title: "Як можна оптимізувати продуктивність у React-застосунках? Які підходи використовуєте для уникнення надмірного рендерингу та для оптимізації часу завантаження компонентів?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 125
difficulty: easy
---

## Відповідь

`React.memo` для чистих компонентів, `useMemo`/`useCallback` для стабільних посилань, lazy loading, code splitting, уникати анонімних функцій у props, React DevTools Profiler для пошуку bottlenecks.

## Приклад

```jsx
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return items.map(i => <Row key={i.id} item={i} />);
});
```

## Юз кейси

- `memo` на важкий список, що рідко змінюється
- `useCallback` для handler, переданого в memo-компонент

## Документація

- [memo — React](https://react.dev/reference/react/memo)
- [useMemo — React](https://react.dev/reference/react/useMemo)
