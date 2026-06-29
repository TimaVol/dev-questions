---
title: "Як використовуєте динамічне програмування в реальних проєктах? Наведіть приклад."
topic: frontend
grade: senior
category: "Алгоритми і структури даних"
order: 86
difficulty: hard
---

## Відповідь

DP на frontend — рідко, але корисно: **memoization** (Fibonacci-style), **knapsack** (bundle optimizer), **LCS** (diff/highlight changes), **edit distance** (fuzzy search suggestions), **optimal path** у wizards. Зазвичай top-down memo з Map або bottom-up table. Часто простіший heuristic виграє — не over-DP. React `useMemo` — memoization, не повна DP table.

## Приклад

Edit distance for fuzzy autocomplete ranking:

```js
function editDistance(a, b, memo = new Map()) {
  const key = `${a}|${b}`;
  if (memo.has(key)) return memo.get(key);
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const cost = a[0] === b[0] ? 0 : 1;
  const result = Math.min(
    editDistance(a.slice(1), b, memo) + 1,
    editDistance(a, b.slice(1), memo) + 1,
    editDistance(a.slice(1), b.slice(1), memo) + cost
  );
  memo.set(key, result);
  return result;
}

function rankSuggestions(query, candidates) {
  return candidates
    .map(word => ({ word, dist: editDistance(query, word) }))
    .filter(x => x.dist <= 2)
    .sort((a, b) => a.dist - b.dist);
}
```

## Юз кейси

- Product search typo «iphne» → «iphone» через edit distance ≤ 2
- Text diff UI: LCS підсвічує змінені параграфи в CMS preview
- Shipping bundle: knapsack — max value у межах weight limit (configurator)

## Документація

- [Dynamic programming — Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)
