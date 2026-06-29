---
title: "Яка ваша улюблена технологія/інструмент/тег у розробці?"
topic: frontend
grade: middle
category: "Загальні запитання"
order: 7
difficulty: easy
---

## Відповідь

Назвіть інструмент з реальним досвідом і trade-off. Vite — швидкий dev; TS — ранні помилки; React Query — серверний стан. Згадайте компроміс.

## Приклад

```ts
const { data } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetch(`/api/users/${id}`).then((r) => r.json()),
});
```

## Юз кейси

- Аргументований вибір інструменту
- Порівняння Zustand vs Redux
- Демонстрація глибини, не списку модних tech

