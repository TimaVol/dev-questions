---
title: "З якими нетривіальними структурами даних ви працювали або які знаєте?"
topic: frontend
grade: senior
category: "Алгоритми і структури даних"
order: 82
difficulty: medium
---

## Відповідь

Frontend-relevant structures: **Trie** — autocomplete/typeahead; **LRU Cache** — memoization, image cache; **Deque** — undo/redo stacks; **Priority Queue** — task scheduling; **Bloom filter** — «maybe seen» dedup; **R-tree/Quadtree** — spatial hit testing (maps, canvas); **Linked list** — React fiber (internal); **Graph** — dependency resolution, route trees; **Union-Find** — grouping connected items. Часто **Map/Set** замість plain objects — O(1) lookup, key any type.

## Приклад

Trie for autocomplete:

```js
class TrieNode { constructor() { this.children = new Map(); this.word = null; } }

class Trie {
  root = new TrieNode();
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.word = word;
  }
  suggest(prefix, limit = 5) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return [];
      node = node.children.get(ch);
    }
    const results = [];
    const dfs = (n) => {
      if (results.length >= limit) return;
      if (n.word) results.push(n.word);
      for (const child of n.children.values()) dfs(child);
    };
    dfs(node);
    return results;
  }
}
```

## Юз кейси

- Search suggest 50k SKUs: Trie prefix lookup <1ms vs filter O(n)
- Undo stack у editor: deque max 100 operations
- Visited URLs dedup: Set для O(1) check під час crawl UI

## Документація

- [Map — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Set — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
