---
title: "Яка різниця між графом і деревом?"
topic: nodejs
grade: senior
category: "Бази даних"
order: 50
difficulty: hard
---

## Відповідь

**Дерево** — зв'язний ациклічний граф; n вузлів → n-1 ребер; один root; унікальний шлях між вузлами. Ієрархії: оргструктура, DOM, B-tree індекс, таксономія категорій.

**Граф** — вузли + ребра; цикли дозволені; directed/undirected, weighted. Соцмережі, граф залежностей, карти маршрутів, knowledge graph.

Алгоритми: дерево — простіший обхід (DFS/BFS O(n), LCA); граф — виявлення циклів, shortest path (Dijkstra), topological sort. БД: adjacency list vs closure table vs graph DB (Neo4j) для глибоких relationship-запитів.

## Приклад

```js
// Tree — category hierarchy
const categories = {
  id: 'root',
  children: [{ id: 'electronics', children: [{ id: 'phones' }] }],
};

// Graph — service dependencies (may cycle if misdesigned)
const deps = new Map([
  ['order-svc', ['payment-svc', 'inventory-svc']],
  ['payment-svc', ['fraud-svc']],
]);
```

## Юз кейси

- Моделювання прав доступу в оргструктурі — дерево
- Аналіз залежностей мікросервісів — DAG (directed acyclic graph)
- Рекомендації «друзі друзів» — graph query

## Документація

- [Tree — Wikipedia](https://en.wikipedia.org/wiki/Tree_(data_structure))
- [Graph — Wikipedia](https://en.wikipedia.org/wiki/Graph_(abstract_data_type))
