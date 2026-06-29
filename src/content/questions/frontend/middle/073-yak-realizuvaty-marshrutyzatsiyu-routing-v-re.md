---
title: "Як реалізувати маршрутизацію (routing) в React?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 73
difficulty: medium
---

## Відповідь

У SPA — React Router: декларативні `<Route>`, nested layouts, URL params. У Next.js — file-based App Router з `page.tsx` і `layout.tsx`. Захищені маршрути — wrapper або layout з перевіркою auth. URL — source of truth для навігації й deep linking.

## Приклад

```tsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="products/:id" element={<Product />} />
  </Route>
</Routes>
```

## Юз кейси

- Вкладені маршрути dashboard (`/settings/profile`)
- Protected route з редіректом на `/login`
- Динамічний параметр `:id` для картки товару

## Документація

- [React Router — Docs](https://reactrouter.com/en/main)
- [Tutorial — React Router](https://reactrouter.com/en/main/start/tutorial)
