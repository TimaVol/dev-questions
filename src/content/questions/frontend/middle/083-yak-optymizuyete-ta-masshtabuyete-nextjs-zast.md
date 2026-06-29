---
title: "Як оптимізуєте та масштабуєте Next.js застосунки для високого трафіку? Як вирішуєте питання кешування, CDN, інших аспектів продуктивності?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 83
difficulty: medium
---

## Відповідь

SSG/ISR для сторінок з високим трафіком — HTML з CDN. `revalidate` для періодичного оновлення без повного rebuild. `next/image` і `next/font` оптимізують медіа. Edge middleware — гео-роутинг і auth. API-кеш у Redis для важких запитів. Streaming SSR для швидшого TTFB.

## Приклад

```tsx
export const revalidate = 60;

export default async function CatalogPage() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 },
  }).then((r) => r.json());
  return <ProductGrid items={products} />;
}
```

## Юз кейси

- ISR каталогу товарів — оновлення кожні 60 с
- Edge middleware для редіректу за країною
- `next/image` з автоматичним WebP і responsive sizes

## Документація

- [Next.js — Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [Next.js — Deploying](https://nextjs.org/docs/app/building-your-application/deploying)
