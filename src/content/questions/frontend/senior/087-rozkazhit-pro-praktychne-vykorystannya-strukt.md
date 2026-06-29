---
title: "Розкажіть про практичне використання структур даних, таких як AVL-дерева або червоно-чорні дерева."
topic: frontend
grade: senior
category: "Алгоритми і структури даних"
order: 87
difficulty: hard
---

## Відповідь

Balanced BST (AVL, Red-Black) — O(log n) insert/search/delete, sorted order traversal. **Рідко реалізують у frontend app code** — `Map`/`Set` використовують hash внутрішньо; DB/indexes обробляють sorted data. Практична обізнаність: **Red-Black** у багатьох stdlib (Java TreeMap, Linux kernel); **AVL** суворіший баланс, швидший lookup. Frontend touchpoints: **interval tree** для calendar overlap detection; **ordered map** при sorted keys з custom comparator — **`SortedMap` libs** або **index у IndexedDB**. На співбесіді: пояснити, коли O(log n) краще за O(n) для in-memory sorted collection з частими inserts.

## Приклад

Interval overlap check (calendar scheduling UI):

```js
// events sorted by start — binary search for overlaps O(log n + k)
function findOverlaps(events, newStart, newEnd) {
  return events.filter(e =>
    newStart < e.end && newEnd > e.start // interval intersection
  );
}

// For 10k events with frequent inserts — RB-tree library or
// maintain sorted array + binary search insert position
function insertEvent(sorted, event) {
  let lo = 0, hi = sorted.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid].start < event.start) lo = mid + 1;
    else hi = mid;
  }
  sorted.splice(lo, 0, event);
}
```

## Юз кейси

- Calendar app: sorted event list + binary search для viewport range
- Leaderboard real-time updates: якщо self-balancing потрібен у scale — server-side
- Відповідь на співбесіді: «Використовуємо server pagination; in-browser — Map, якщо не потрібен sorted traversal»

## Документація

- [Map — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Array.sort — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
