---
title: "Поясніть, що відбувається в цьому коді та в яких сценаріях він може бути корисним:"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 64
difficulty: hard
---

## Відповідь

На співбесіді показують типовий snippet — часто **custom hook з closure**, **useEffect cleanup**, **useMemo/useCallback**, **render prop**, або **React 18 pattern**. Алгоритм відповіді: (1) що робить кожен рядок; (2) deps array — коли re-run; (3) cleanup — що при unmount; (4) pitfalls — stale closure, missing deps, memory leak; (5) коли корисно — real scenario. Якщо код не показано — попросіть snippet; нижче типовий приклад «stable subscription».

## Приклад

```tsx
function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // cleanup — cancel pending update
  }, [value, delay]);
  return debounced;
}

// Usage — search API
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 400);
  const { data } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchApi(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });
}
```

**Що відбувається:** кожна зміна `value` планує update через `delay` ms; якщо value зміниться раніше — попередній timeout скасовується. **Корисно:** search input, resize handler, autosave — зменшити API calls.

## Юз кейси

- Live search: 400ms debounce — 1 request замість 10 на слово
- Autosave draft: debounce form state → PATCH /api/draft
- Window resize: debounce chart redraw

## Документація

- [useEffect — React](https://react.dev/reference/react/useEffect)
- [useState — React](https://react.dev/reference/react/useState)
