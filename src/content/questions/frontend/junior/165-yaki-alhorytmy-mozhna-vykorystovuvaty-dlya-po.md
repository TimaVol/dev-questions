---
title: "Які алгоритми можна використовувати для пошуку найкоротшого шляху в графі?"
topic: frontend
grade: junior
category: "Алгоритми та структури даних"
order: 165
difficulty: easy
---

## Відповідь

BFS — найкоротший шлях у незваженому графі. Dijkstra — зважений граф без від'ємних ваг. A* — з евристикою для карт/навігації. На фронті рідко, але знати варто.

## Приклад

```js
// BFS shortest path (unweighted)
function shortestPath(graph, from, to) {
  const queue = [[from, [from]]];
  const visited = new Set([from]);
  while (queue.length) {
    const [node, path] = queue.shift();
    if (node === to) return path;
    for (const next of graph[node] ?? []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, [...path, next]]);
      }
    }
  }
  return null;
}
```

## Юз кейси

- BFS у грі «знайди вихід з лабіринту»
- Маршрутизація в навігаційному додатку

## Документація

- [Dijkstra — Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [Graph traversal — Wikipedia](https://en.wikipedia.org/wiki/Graph_traversal)
