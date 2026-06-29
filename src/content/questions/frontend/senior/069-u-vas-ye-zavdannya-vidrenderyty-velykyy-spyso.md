---
title: "У вас є завдання відрендерити великий список (100к + items). Як би виконали це завдання?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 69
difficulty: hard
---

## Відповідь

100k DOM nodes — неможливо. Стратегія: **virtualization** — рендерити лише видимі рядки (~20–40). Бібліотеки: `@tanstack/react-virtual`, `react-window`, `react-virtuoso`. Також: **pagination/infinite scroll** на сервері (cursor-based), **Web Worker** для filter/sort на 100k dataset, **memo** row component, стабільний `key`, уникати Context над списком. Вимірювати: React Profiler, FPS під час scroll. Якщо дані з API — не завантажувати 100k одразу; virtual list + fetch pages.

## Приклад

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function HugeList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  return (
    <div ref={parentRef} style={{ height: 600, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(vRow => (
          <div
            key={vRow.key}
            style={{ position: 'absolute', top: 0, transform: `translateY(${vRow.start}px)`, height: vRow.size }}
          >
            <Row item={items[vRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}

const Row = memo(function Row({ item }: { item: Item }) {
  return <div className="row">{item.name}</div>;
});
```

## Юз кейси

- Admin table 100k rows: virtual + server-side sort/filter
- Chat messages: reverse virtual scroll, append без стрибка scroll
- CSV import preview: Worker парсить, virtual list відображає

## Документація

- [react-window](https://react-window.vercel.app/)
- [Virtualize long lists — web.dev](https://web.dev/articles/virtualize-long-lists-react-window)
