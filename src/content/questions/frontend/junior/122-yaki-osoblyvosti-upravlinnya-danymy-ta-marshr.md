---
title: "Які особливості управління даними та маршрутизації?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 122
difficulty: medium
---

## Відповідь

Роутинг: React Router, Next.js file-based routes, Vue Router. Дані: локальний стан, Context, глобальний store (Zustand), серверний стан (React Query). URL — джерело правди для фільтрів і пагінації.

## Приклад

```jsx
import { Routes, Route } from 'react-router-dom';
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/users/:id" element={<UserPage />} />
</Routes>
```

## Юз кейси

- Query params для фільтрів: `/products?category=shoes`
- Protected routes з redirect на login

## Документація

- [Managing state — React](https://react.dev/learn/managing-state)
- [Context — React](https://react.dev/learn/passing-data-deeply-with-context)
