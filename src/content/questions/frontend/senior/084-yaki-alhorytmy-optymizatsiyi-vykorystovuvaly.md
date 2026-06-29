---
title: "Які алгоритми оптимізації використовували для підвищення продуктивності великих застосунків?"
topic: frontend
grade: senior
category: "Алгоритми і структури даних"
order: 84
difficulty: medium
---

## Відповідь

Frontend perf «алгоритми»: **debounce/throttle** input handlers; **virtualization** O(viewport), не O(n) DOM; **memoization** дорогого derive; **Web Worker** для важкого parse (CSV, JSON); **requestIdleCallback** для non-critical work; **incremental rendering** (React concurrent); **index Map** для O(1) lookup замість array.find O(n); **batch DOM updates** (DocumentFragment); **lazy load** images/routes; **compression** (Brotli). Вимірювати перед оптимізацією — Profiler, Lighthouse.

## Приклад

Index users by id — O(1) lookup in dashboard:

```js
// ❌ O(n) per lookup × 1000 renders
const user = users.find(u => u.id === id);

// ✅ build once O(n), lookup O(1)
const userById = useMemo(() => new Map(users.map(u => [u.id, u])), [users]);
const user = userById.get(id);
```

Web Worker for CSV parse:

```js
// worker.ts
self.onmessage = (e) => {
  const rows = parseCSV(e.data); // 50MB file
  self.postMessage(rows);
};
// main thread stays responsive
```

## Юз кейси

- Filter 20k table rows: pre-index + Worker filter → UI thread вільний
- Autocomplete: Trie + debounce 200ms — у 10 разів менше comparisons
- Image gallery: IntersectionObserver lazy load — −60% initial bandwidth

## Документація

- [Web Workers API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Profiler — React](https://react.dev/reference/react/Profiler)
