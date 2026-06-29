---
title: "Як реалізувати пошук у ширину та пошук у глибину на графі й дереві?"
topic: frontend
grade: junior
category: "Алгоритми та структури даних"
order: 159
difficulty: hard
---

## Відповідь

BFS — черга, обхід рівень за рівнем (найкоротший шлях у незваженому графі). DFS — стек/рекурсія, йде вглиб (обхід дерева, топологічне сортування).

## Приклад

```js
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  while (queue.length) {
    const node = queue.shift();
    for (const neighbor of graph[node] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

## Юз кейси

- BFS — найкоротший шлях у соцмережі
- DFS — обхід DOM-дерева

## Документація

- [BFS — Wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)
- [DFS — Wikipedia](https://en.wikipedia.org/wiki/Depth-first_search)
