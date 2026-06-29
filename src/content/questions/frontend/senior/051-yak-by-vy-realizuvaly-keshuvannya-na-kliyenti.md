---
title: "Як би ви реалізували кешування на клієнті? Коли це доречно?"
topic: frontend
grade: senior
category: "JavaScript"
order: 51
difficulty: hard
---

## Відповідь

Кешування доречне, коли дані **читаються часто, змінюються рідко**, і мережа — bottleneck. Рівні: (1) **HTTP cache** — `Cache-Control`, ETag, immutable hashed assets; (2) **in-memory** — React Query/SWR для server state з staleTime/gcTime; (3) **persistent** — IndexedDB для offline; (4) **Service Worker** — stale-while-revalidate для assets. Ключова складність — **invalidation**: після mutation invalidate query keys, optimistic updates з rollback. Не кешуйте персональні дані без TTL і без стратегії очищення при logout. Кеш без метрик — guessing: міряйте cache hit rate і stale UI bugs.

## Приклад

```ts
// React Query — server state cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60_000, gcTime: 30 * 60_000 },
  },
});

function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetch(`/api/products/${id}`).then(r => r.json()),
  });
}

// Invalidate після update
async function updateProduct(id: string, data: Product) {
  await api.update(id, data);
  queryClient.invalidateQueries({ queryKey: ['product', id] });
}
```

## Юз кейси

- Product catalog: staleTime 10 хв, background refetch on focus
- User profile: no cache after logout — `queryClient.clear()`
- Static assets: `Cache-Control: public, max-age=31536000, immutable` на hashed files

## Документація

- [HTTP caching — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [CacheStorage — MDN](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage)
