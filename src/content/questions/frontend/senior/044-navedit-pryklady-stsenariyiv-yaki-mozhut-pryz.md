---
title: "Наведіть приклади сценаріїв, які можуть призвести до витоку пам’яті у клієнтському коді."
topic: frontend
grade: senior
category: "JavaScript"
order: 44
difficulty: medium
---

## Відповідь

Memory leaks — об'єкти, що не GC через lingering references. Типові сценарії: **забуті event listeners** після component unmount; **setInterval/setTimeout** без clear; **closures** з великими objects; **Detached DOM nodes** у JS references; **global caches** без eviction; **WebSocket/subscription** не closed; **React**: відсутній cleanup у useEffect; **WeakMap** vs Map — WeakMap для DOM-associated metadata. Debug: Chrome Memory tab → heap snapshot → compare allocations.

## Приклад

```js
// ❌ leak: listener never removed
function mountWidget(el) {
  const data = loadHugeDataset(); // 10MB
  window.addEventListener('resize', () => update(el, data));
}

// ✅ cleanup
function mountWidget(el) {
  const data = loadHugeDataset();
  const onResize = () => update(el, data);
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}
```

```tsx
// React leak
useEffect(() => {
  const id = setInterval(pollStatus, 1000);
  // missing: return () => clearInterval(id);
}, []);
```

Detached DOM: DevTools → Memory → «Detached HTMLDivElement» retained by closure.

## Юз кейси

- SPA route change: unsubscribe RxJS, abort fetch, видалити listeners
- Chart library: викликати `chart.destroy()` при unmount
- Infinite scroll: cap cache на 500 items, LRU eviction

## Документація

- [Memory management — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [removeEventListener — MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
