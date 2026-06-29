---
title: "Як взаємодіяти з API в межах бібліотек/фреймворків?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 121
difficulty: medium
---

## Відповідь

Fetch у `useEffect` або краще — React Query/SWR для кешу, loading/error станів. Винось API-логіку в окремі модулі (`api/users.ts`), типізуй відповіді в TypeScript.

## Приклад

```jsx
function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });
  if (isLoading) return <Spinner />;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

## Юз кейси

- React Query — автоматичний refetch і кеш
- Custom hook `useUser(id)` для перевикористання

## Документація

- [HTTP overview — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [Fetch API — MDN](https://developer.mozilla.org/uk/docs/Web/API/Fetch_API)
