---
title: "Як оптимізувати продуктивність рішень з використанням фреймворків?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 119
difficulty: easy
---

## Відповідь

Code splitting, lazy loading роутів, мемоізація (`memo`, `useMemo`), віртуалізація довгих списків, оптимізація зображень, SSR/SSG для швидшого FCP, аналіз bundle.

## Приклад

```jsx
const Dashboard = lazy(() => import('./Dashboard'));
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Dashboard />
    </Suspense>
  );
}
```

## Юз кейси

- `React.lazy` для важких сторінок адмінки
- `react-window` для списку на 10k елементів

## Документація

- [memo — React](https://react.dev/reference/react/memo)
- [Code splitting — web.dev](https://web.dev/learn/performance/code-split-javascript)
