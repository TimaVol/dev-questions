---
title: "Які стратегії кешування даних можуть бути використані у фронтенд-застосунках?"
topic: frontend
grade: junior
category: "Робота з бекендом"
order: 153
difficulty: medium
---

## Відповідь

HTTP-кеш (Cache-Control), React Query/SWR (stale-while-revalidate), localStorage для офлайн-режиму, кеш Service Worker, сховище в пам'яті. TTL і інвалідація після мутацій.

## Приклад

```jsx
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 хв «свіжі»
});
```

## Юз кейси

- React Query — кеш списку користувачів між навігаціями
- `invalidateQueries` після POST нового запису

## Документація

- [HTTP caching — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
