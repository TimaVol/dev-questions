---
title: "Що таке мікросервісна архітектура і її переваги порівняно з монолітною?"
topic: frontend
grade: senior
category: "Архітектура"
order: 96
difficulty: hard
---

## Відповідь

Microservices — незалежно deployable services, кожен володіє bounded context, спілкуються через API/events. **Pros:** автономія команд, scale services окремо, tech diversity, fault isolation. **Cons:** distributed complexity, network latency, складніша observability, eventual consistency, DevOps overhead. **Monolith pros:** простіший deploy/debug, ACID transactions, нижча ops cost. Frontend angle: **BFF** (Backend for Frontend) агрегує microservices; **API gateway**; partial failures (один service down — degrade UI); **contract testing** (Pact). Не microservice prematurely — monolith first, поки team/org scale не вимагає split.

## Приклад

Frontend BFF pattern:

```
Browser → Next.js API routes (BFF) → [User Service, Order Service, Catalog Service]
```

```tsx
// app/api/checkout/route.ts — aggregates calls
export async function POST(req: Request) {
  const body = await req.json();
  const [user, inventory] = await Promise.all([
    fetch(`${USER_SVC}/users/${body.userId}`),
    fetch(`${CATALOG_SVC}/reserve`, { method: 'POST', body: JSON.stringify(body.items) }),
  ]);
  if (!inventory.ok) return Response.json({ error: 'out_of_stock' }, { status: 409 });
  const order = await fetch(`${ORDER_SVC}/orders`, { method: 'POST', body: JSON.stringify(body) });
  return order;
}
```

Graceful degradation:

```tsx
if (recommendationsFailed) return <ProductPage product={product} />; // no reco widget
```

## Юз кейси

- Reviews service down: product page завантажується без reviews section + banner
- Mobile app + web ділять User API — окремі BFF на client shape
- Strangler: monolith routes поступово проксуються до нових services

## Документація

- [Microservices — martinfowler.com](https://martinfowler.com/articles/microservices.html)
- [Monolith vs Microservices](https://martinfowler.com/bliki/MonolithFirst.html)
