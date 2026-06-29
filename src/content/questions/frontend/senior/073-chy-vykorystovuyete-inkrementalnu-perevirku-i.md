---
title: "Чи використовуєте інкрементальну перевірку (incremental static regeneration) в Next.js для оновлення статичних сторінок на основі часових інтервалів або змін у даних? Як це впливає на продуктивність і кешування?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 73
difficulty: medium
---

## Відповідь

**ISR** — static pages регенеруються у background після `revalidate` секунд або on-demand (`revalidatePath`/`revalidateTag`). Перший request після TTL: stale page миттєво, потім regenerate — хороший TTFB + свіжий контент. **App Router**: `export const revalidate = 60` або `fetch(url, { next: { revalidate: 60, tags: ['products'] } })`. On-demand: `revalidateTag('products')` після оновлення CMS. Шари cache: CDN → Next Data Cache → origin. Trade-off: короткий revalidate = свіжіше, більше навантаження на origin.

## Приклад

```tsx
// app/products/[slug]/page.tsx — App Router ISR
export const revalidate = 300; // 5 min

async function getProduct(slug: string) {
  return fetch(`https://api.example.com/products/${slug}`, {
    next: { revalidate: 300, tags: [`product-${slug}`] },
  }).then(r => r.json());
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  return <ProductDetail product={product} />;
}
```

On-demand revalidation (Server Action / webhook):

```ts
import { revalidateTag } from 'next/cache';
export async function POST(req: Request) {
  const { slug } = await req.json();
  revalidateTag(`product-${slug}`);
  return Response.json({ revalidated: true });
}
```

## Юз кейси

- Product catalog 10k SKUs: ISR 5min — static speed, ціни достатньо свіжі
- CMS publish webhook: on-demand revalidate лише змінених сторінок
- vs SSR на кожен request: ISR зменшує origin CPU на 90% на read-heavy сайті

## Документація

- [Incremental Static Regeneration — Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
