---
title: "Як оптимізувати продуктивність у великих React-застосунках?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 75
difficulty: hard
---

## Відповідь

Code splitting і lazy routes зменшують initial bundle. React Query кешує серверні дані й зменшує зайві fetch. Віртуалізація для довгих списків, debounce для пошуку. Web Workers — для важких обчислень. Вимірюю Profiler + Lighthouse, оптимізую за даними, не інтуїцією.

## Приклад

```tsx
const AdminPanel = lazy(() => import('./AdminPanel'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AdminPanel />
    </Suspense>
  );
}
```

## Юз кейси

- Lazy-завантаження адмін-модуля (~200KB)
- Virtual list для 10 000 рядків логів
- React Query `staleTime: 5 * 60_000` для профілю користувача

## Документація

- [Optimizing performance — React](https://react.dev/learn/render-and-commit)
- [React.lazy — React](https://react.dev/reference/react/lazy)
