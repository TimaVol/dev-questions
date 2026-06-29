---
title: "Які є стратегії масштабування вебзастосунків?"
topic: frontend
grade: senior
category: "Архітектура"
order: 99
difficulty: hard
---

## Відповідь

Виміри scale: **users** (CDN, edge, horizontal pods), **data** (pagination, virtualization, server filter), **team** (monorepo modules, microfrontends), **features** (feature flags, plugin architecture), **geography** (multi-CDN, geo-routing). Frontend-specific: **static generation** де можливо, **ISR**, **edge SSR**, **regional API**, **client cache** (React Query), **Web Workers**, **service workers**. Bottleneck зазвичай API/DB — frontend масштабується дешево через CDN. Вимірювати RUM перед scale infra.

## Приклад

Horizontal scale architecture:

```
Users → CloudFront CDN (static)
      → Edge SSR (Vercel/Cloudflare Workers)
      → Origin API (autoscaling K8s)
      → Redis cache → PostgreSQL read replicas
```

Client scale — cursor pagination:

```ts
async function fetchOrders(cursor?: string) {
  const url = cursor ? `/api/orders?cursor=${cursor}&limit=50` : `/api/orders?limit=50`;
  return fetch(url).then(r => r.json()); // { items, nextCursor }
}
```

Microfrontend scale (team):

```js
// shell app
const RemoteAdmin = lazy(() => import('adminApp/AdminModule'));
```

## Юз кейси

- 10M MAU marketing: SSG + CDN — origin ледь торкається
- SaaS dashboard heavy data: server aggregation + client virtual list
- 5 команд один продукт: Module Federation або iframe microfrontends

## Документація

- [Code splitting — web.dev](https://web.dev/learn/performance/code-split-javascript)
- [Incremental Static Regeneration — Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
