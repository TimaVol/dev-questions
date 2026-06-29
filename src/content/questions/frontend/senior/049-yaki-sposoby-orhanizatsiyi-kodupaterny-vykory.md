---
title: "Які способи організації коду/патерни використовуєте і чому?"
topic: frontend
grade: senior
category: "JavaScript"
order: 49
difficulty: hard
---

## Відповідь

Організація залежить від розміру команди і продукту. **Feature-based folders** (`features/checkout/`, `features/auth/`) — масштабується, зменшує cross-imports. **Layered** (ui → hooks → services → api) — чіткі залежності, добре для середніх проєктів. **FSD (Feature-Sliced Design)** — для великих monorepo. Патерни: **composition over inheritance**, **custom hooks** для логіки, **repository** для API calls, **factory** для тестових даних. У React: container/presentational (застарілий, але ідея жива — smart/dumb components), compound components. Senior не нав'язує DDD у pet-проєкт — обирає мінімум структури, який команда підтримає.

## Приклад

```
src/
├── features/
│   └── orders/
│       ├── components/OrderList.tsx
│       ├── hooks/useOrders.ts
│       ├── api/ordersApi.ts
│       └── index.ts          # public API модуля
├── shared/
│   ├── ui/Button.tsx
│   └── lib/fetcher.ts
└── app/
    └── routes.tsx
```

```ts
// features/orders/hooks/useOrders.ts — логіка окремо від UI
export function useOrders(status: OrderStatus) {
  return useQuery({
    queryKey: ['orders', status],
    queryFn: () => ordersApi.list(status),
  });
}
```

## Юз кейси

- Стартап 3 devs: flat `components/` + `hooks/` — не over-engineer
- Enterprise 20 devs: feature modules з explicit public exports
- Legacy міграція: strangler — нові фічі в `features/`, старий код в `legacy/`

## Документація

- [Importing and exporting components — React](https://react.dev/learn/importing-and-exporting-components)
- [Feature-Sliced Design](https://feature-sliced.design/)
