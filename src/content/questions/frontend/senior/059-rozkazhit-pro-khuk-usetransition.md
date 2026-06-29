---
title: "Розкажіть про хук useTransition."
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 59
difficulty: hard
---

## Відповідь

`useTransition` — React 18 Concurrent feature. Позначає state update як **non-urgent transition** — React може перервати для urgent updates (typing, clicks). Повертає `[isPending, startTransition]`. UI: pending indicator. Пара з `Suspense` для lazy routes. Не для controlled input value — input має бути urgent sync state. Альтернатива: `startTransition` import без hook. Відкладає дорогі re-renders (filter, sort, tab switch).

## Приклад

```tsx
function ProductCatalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState(products);
  const [isPending, startTransition] = useTransition();

  function onFilterChange(value: string) {
    setFilter(value); // urgent — input responsive
    startTransition(() => {
      setFiltered(products.filter(p => p.name.includes(value)));
    });
  }

  return (
    <div aria-busy={isPending}>
      <input value={filter} onChange={e => onFilterChange(e.target.value)} />
      {isPending ? <Skeleton count={5} /> : <Grid items={filtered} />}
    </div>
  );
}
```

Tab switch with Suspense:

```tsx
const [tab, setTab] = useState('home');
const [isPending, startTransition] = useTransition();
<button onClick={() => startTransition(() => setTab('reports'))}>Reports</button>
<Suspense fallback={<Spinner />}>{tab === 'reports' && <HeavyReports />}</Suspense>
```

## Юз кейси

- Search 5k items: transition на results, не на keystroke state
- Dashboard widget refresh: background transition, chart залишається інтерактивним
- Route navigation: `router.push` обгорнутий у startTransition (Next.js App Router)

## Документація

- [useTransition — React](https://react.dev/reference/react/useTransition)
