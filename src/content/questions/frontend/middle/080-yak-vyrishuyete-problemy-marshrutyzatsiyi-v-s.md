---
title: "Як вирішуєте проблеми маршрутизації в складних React-застосунках? Які підходи використовуєте для організації маршрутів та управління структурою застосунку?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 80
difficulty: medium
---

## Відповідь

Складні SPA організовую через nested layouts, lazy routes і route guards. Auth-перевірка в layout або loader. URL синхронізую зі станом фільтрів для shareable links. У Next.js App Router — file-based структура, parallel і intercepting routes для модалок.

## Приклад

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
```

## Юз кейси

- Guard на `/admin/*` з редіректом неавторизованих
- Nested layout: sidebar + outlet для вкладених сторінок
- Deep link `/products/42?color=red` відкриває потрібний стан

## Документація

- [React Router — Docs](https://reactrouter.com/en/main)
- [Nested routes — React Router](https://reactrouter.com/en/main/start/tutorial#nested-routes)
