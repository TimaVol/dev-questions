---
title: "Які підходи використовуєте для lazy loading компонентів, управління станом і кешування даних?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 78
difficulty: hard
---

## Відповідь

Компоненти — `React.lazy` + `Suspense` з route-based splitting. Дані — React Query/SWR з `staleTime`, `prefetchQuery` на hover. У Next.js — dynamic `import()` для важких client components. Кеш інвалідую через `queryClient.invalidateQueries` після мутацій.

## Приклад

```tsx
const Settings = lazy(() => import('./Settings'));

function Profile() {
  const { data } = useQuery({ queryKey: ['user'], queryFn: fetchUser, staleTime: 5 * 60_000 });
  return <div>{data?.name}</div>;
}
```

## Юз кейси

- Lazy-сторінка налаштувань (~150KB)
- Кеш профілю на 5 хвилин без повторного fetch
- Prefetch наступної сторінки при hover на `<Link>`

## Документація

- [React.lazy — React](https://react.dev/reference/react/lazy)
- [Managing state — React](https://react.dev/learn/managing-state)
