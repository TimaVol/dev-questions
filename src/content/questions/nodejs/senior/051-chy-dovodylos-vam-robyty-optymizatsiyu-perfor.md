---
title: "Чи доводилось вам робити оптимізацію перформансу за допомогою структур даних?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 51
difficulty: medium
---

## Відповідь

Так — вибір структури даних часто дає більший виграш, ніж мікрооптимізації. **Map/Set** O(1) lookup vs array O(n). **Heap/priority queue** для top-K, scheduling. **Bloom filter** — швидке «ймовірно існує» перед зверненням до БД. **LRU cache** (Map + doubly-linked list або пакет lru-cache) для гарячих keys.

**Trie** — prefix search autocomplete. **Ring buffer** — фіксована пам'ять для метрик. На рівні БД: B-tree індекси — структура даних на диску.

Спочатку вимірюйте: профілюйте bottleneck, потім структуру. Передчасний Redis-кеш без метрик — антипатерн.

## Приклад

```js
// O(n) duplicate check — bad at scale
const seen = [];
for (const id of ids) if (seen.includes(id)) ...

// O(1) per lookup
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) markDuplicate(id);
  seen.add(id);
}
```

## Юз кейси

- In-memory dedup для batch обробки 1M подій
- Rate limiter sliding window через sorted Set timestamps
- Bloom filter перед дорогим перевіренням існування в БД

## Документація

- [Map — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Map)
