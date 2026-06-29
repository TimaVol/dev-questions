---
title: "Як оптимізувати рендеринг компонентів у React?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 74
difficulty: medium
---

## Відповідь

Спочатку вимірюю React Profiler — оптимізую лише підтверджені вузькі місця. `React.memo` — для важких дочірніх компонентів зі стабільними props. `useMemo`/`useCallback` — коли обчислення або посилання дорогі. Довгі списки — віртуалізація. Розділяю Context, щоб не re-renderити все дерево.

## Приклад

```tsx
const MemoRow = React.memo(function Row({ item }: { item: Product }) {
  return <tr><td>{item.name}</td><td>{item.price}</td></tr>;
});
```

## Юз кейси

- `memo` для рядків таблиці з 500 позиціями
- `useMemo` для дорогої фільтрації каталогу
- Profiler перед додаванням `useCallback` «на всяк випадок»

## Документація

- [memo — React](https://react.dev/reference/react/memo)
- [Optimizing performance — React](https://react.dev/learn/render-and-commit)
