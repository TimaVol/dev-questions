---
title: "Розкажіть про алгоритми роботи з деревами, такі як обхід дерева."
topic: frontend
grade: junior
category: "Алгоритми та структури даних"
order: 164
difficulty: easy
---

## Відповідь

Обхід дерева: in-order (лівий-корінь-правий), pre-order (корінь-лівий-правий), post-order (лівий-правий-корінь). BFS — по рівнях. DFS — рекурсія або стек.

## Приклад

```js
function traverse(node, visit) {
  if (!node) return;
  visit(node);
  node.children?.forEach(child => traverse(child, visit));
}
```

## Юз кейси

- Рендер nested menu з деревоподібної структури
- Пошук файлу в дереві каталогів

## Документація

- [BFS — Wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)
- [DFS — Wikipedia](https://en.wikipedia.org/wiki/Depth-first_search)
