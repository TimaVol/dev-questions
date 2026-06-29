---
title: "Розкажіть про Single Page Application, його переваги та недоліки."
topic: frontend
grade: senior
category: "Архітектура"
order: 100
difficulty: hard
---

## Відповідь

SPA — один HTML shell, client router, JS рендерить views, дані через API. **Pros:** app-like UX, швидка навігація після load, багата інтерактивність, чіткий API boundary. **Cons:** великий initial JS bundle, складніший SEO (потрібен SSR/prerender), повільний FCP на mobile, a11y при лише client-render, memory на довгих sessions. Сучасний hybrid: **Next.js/Remix** — SPA feel з SSR/SSG. SPA коли: authenticated dashboard, низька потреба в SEO. Уникати pure SPA для: marketing, content, аудиторії на повільних пристроях.

## Приклад

Vite SPA routing:

```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    { index: true, element: <Dashboard /> },
    { path: 'orders/:id', element: <OrderDetail /> },
  ]},
]);

export function App() {
  return <RouterProvider router={router} />;
}
```

Initial load cost mitigation:

```tsx
const Admin = lazy(() => import('./pages/Admin'));
// + Suspense + route-based chunks
```

## Юз кейси

- Internal CRM: SPA ідеально — усі користувачі authenticated, SEO неважливе
- Public blog: SSR/SSG виграє — SPA шкодить SEO і LCP
- Hybrid: marketing SSG + `/app/*` SPA shell за login

## Документація

- [History API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [Client-side routing — React Router](https://reactrouter.com/start/declarative/routing)
