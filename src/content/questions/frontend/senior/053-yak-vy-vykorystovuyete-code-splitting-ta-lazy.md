---
title: "Як ви використовуєте code splitting та lazy loading у коді для оптимізації завантаження сторінок та ресурсів? Як це впливає на продуктивність застосунку?"
topic: frontend
grade: senior
category: "JavaScript"
order: 53
difficulty: medium
---

## Відповідь

**Code splitting** — розбиття bundle на chunks, що завантажуються on-demand. **Lazy loading** — відкладене завантаження ресурсів до моменту потреби. Інструменти: dynamic `import()`, `React.lazy()` + `Suspense`, route-based splitting у Vite/Next. Images: `loading="lazy"`, `srcset`, modern formats (WebP/AVIF). Impact: менший initial JS → кращий TTI/FCP; trade-off — додатковий network round-trip при першому переході на route (preload/prefetch для critical paths). Міряйте: initial bundle size, chunk count, waterfall у Network tab. Не split кожен компонент — overhead на HTTP requests (менш критично на HTTP/2).

## Приклад

```tsx
import { lazy, Suspense } from 'react';

const AdminPanel = lazy(() => import('./features/admin/AdminPanel'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}
```

```tsx
// Vite — magic comment для chunk name
const Chart = lazy(() => import(/* webpackChunkName: "chart" */ './Chart'));
```

```html
<img src="hero.webp" loading="eager" fetchpriority="high" />
<img src="thumb.webp" loading="lazy" decoding="async" />
```

## Юз кейси

- Dashboard: main bundle 80KB, admin chunk 200KB — завантажується лише для admins
- Modal з важкою lib: dynamic import при першому відкритті
- Prefetch: `<link rel="prefetch" href="/chunks/checkout.js">` після add-to-cart

## Документація

- [lazy — React](https://react.dev/reference/react/lazy)
- [Code splitting — web.dev](https://web.dev/learn/performance/code-split-javascript)
