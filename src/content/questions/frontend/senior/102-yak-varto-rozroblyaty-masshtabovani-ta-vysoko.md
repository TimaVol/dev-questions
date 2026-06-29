---
title: "Як варто розробляти масштабовані та високопродуктивні фронтенд-системи?"
topic: frontend
grade: senior
category: "Архітектура"
order: 102
difficulty: hard
---

## Відповідь

Принципи: **measure first** (Core Web Vitals, bundle analyzer); **performance budget у CI**; **progressive enhancement**; **code splitting + lazy routes**; **server state cache** (React Query); **мінімум client JS** (RSC/static де можливо); **design system** для консистентності; **feature flags** для safe rollout; **observability** (Sentry, Web Vitals RUM); **чіткі module boundaries**; **automated testing pyramid**; **documentation (ADR)**. Scale команди: monorepo, ownership на feature, RFC process. Уникати premature microfrontends.

## Приклад

Performance budget in CI + architecture:

```json
// lighthouserc.json assertions + vite build analyzer gate
```

Scalable data layer:

```tsx
// Server state — React Query with staleTime per resource type
const products = useQuery({ queryKey: ['products'], queryFn: fetchProducts, staleTime: 5 * 60_000 });
// UI state — Zustand selectors
const filter = useFilterStore(s => s.category);
```

RSC for read-heavy page (Next.js):

```tsx
// app/products/page.tsx — server component, zero client JS for list
export default async function ProductsPage() {
  const products = await db.products.findMany();
  return <ProductGrid products={products} />; // client island only for «Add to cart»
}
```

## Юз кейси

- 100k SKU catalog: ISR + edge cache + client search debounce
- 50 engineers: monorepo + CODEOWNERS на package
- Perf regression: Lighthouse CI блокує merge при LCP +300ms

## Документація

- [Performance — web.dev](https://web.dev/performance)
- [Scaling your React app — React](https://react.dev/learn/scaling-up-with-reducer-and-context)
