---
title: "Які алгоритми сортування вважаєте найбільш ефективними для обробки великих наборів даних?"
topic: frontend
grade: senior
category: "Алгоритми і структури даних"
order: 85
difficulty: hard
---

## Відповідь

У browser JS: **`Array.prototype.sort`** — Timsort O(n log n), stable, оптимізований у V8. Для великих даних: **не сортувати на клієнті** — server pagination + sort. Якщо треба: **Web Worker** sort; **incremental sort** для top-K (heap); **radix/counting sort** для integers у діапазоні. Partial sort: **`quickselect`** для median/top N. Pre-sort даних при індексації (Algolia, DB). Stable sort важливий при multi-column tie-break. O(n²) insertion sort OK — n < 50.

## Приклад

Server-side sort (preferred):

```js
const res = await fetch(`/api/products?sort=price&order=asc&page=2&limit=50`);
const { items } = await res.json(); // already sorted 50 items
```

Top 10 from 100k without full sort — min-heap approach:

```js
function topK(arr, k, compare) {
  const heap = [];
  for (const item of arr) {
    if (heap.length < k) { heap.push(item); heap.sort(compare).reverse(); }
    else if (compare(item, heap[0]) > 0) { heap[0] = item; heap.sort(compare).reverse(); }
  }
  return heap.sort(compare);
}
// topK(products, 10, (a, b) => b.revenue - a.revenue);
```

Worker sort for client-only dataset:

```js
worker.postMessage({ type: 'sort', data: bigArray, key: 'createdAt' });
```

## Юз кейси

- Data grid 100k rows: server sort + virtual scroll — ніколи не сортувати 100k у main thread
- Leaderboard top 100: heap O(n log k) vs full sort O(n log n)
- Locale-aware sort: `arr.sort((a,b) => a.name.localeCompare(b.name, 'uk'))`

## Документація

- [Array.sort — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
