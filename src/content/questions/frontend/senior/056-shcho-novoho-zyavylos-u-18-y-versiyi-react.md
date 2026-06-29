---
title: "Що нового зʼявилось у 18-й версії React?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 56
difficulty: easy
---

## Відповідь

React 18 — фундамент для concurrent rendering. Ключові фічі: **Automatic Batching** — кілька setState в async/Promise/event batch в один re-render; **`useTransition`** — позначити update як non-urgent (UI залишається responsive); **`useDeferredValue`** — відкласти expensive render; **`Suspense`** на сервері (streaming SSR у Next.js); **`createRoot`** замість `ReactDOM.render`; **Strict Mode double-invoke** effects у dev для виявлення side effects. Нові hooks для libraries: `useId`, `useSyncExternalStore` (Zustand/Redux). React 18 не ламає більшість apps, але потребує migration на `createRoot` і перевірки effects на idempotency.

## Приклад

```tsx
import { useState, useTransition, useDeferredValue } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value); // urgent — input responsive
    startTransition(() => {
      // deferredQuery оновиться пізніше — важкий список не блокує input
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <span>Оновлення...</span>}
      <HeavyList filter={deferredQuery} />
    </>
  );
}
```

```tsx
// Migration
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')!).render(<App />);
```

## Юз кейси

- Search з 10k results: `useDeferredValue` замість debounce + loading state
- Tab switch: `startTransition` — старий tab видимий поки новий рендериться
- SSR streaming: Suspense boundaries для progressive HTML

## Документація

- [React 18 — Blog](https://react.dev/blog/2022/03/29/react-v18)
