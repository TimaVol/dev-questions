---
title: "Як паралельно пройтись по масиву Promises? А послідовно?"
topic: frontend
grade: senior
category: "JavaScript"
order: 41
difficulty: hard
---

## Відповідь

**Паралельно:** `Promise.all(array)` — fail-fast якщо один reject; `Promise.allSettled` — чекає всі, повертає status кожного; `Promise.race` — перший settled. **Послідовно:** `for...of` + `await`, або `reduce` chain. Обмеження concurrency: **pool pattern** — max N одночасних (напр. 5 API calls). Senior обирає: parallel для independent requests, sequential коли rate limit або order matters, pooled для balance.

## Приклад

```js
const ids = [1, 2, 3, 4, 5];

// Паралельно — всі одразу
const users = await Promise.all(ids.map(id => fetch(`/api/users/${id}`).then(r => r.json())));

// Послідовно — один за одним
const ordered = [];
for (const id of ids) {
  ordered.push(await fetch(`/api/users/${id}`).then(r => r.json()));
}

// Pool — max 3 concurrent
async function pool(tasks, limit) {
  const results = [];
  const executing = new Set();
  for (const [i, task] of tasks.entries()) {
    const p = task().then(r => { executing.delete(p); return r; });
    executing.add(p);
    results[i] = p;
    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.all(results);
}
await pool(ids.map(id => () => fetchUser(id)), 3);
```

## Юз кейси

- Upload 50 files: pool 5 — швидше sequential, не DDoS own API
- Transaction steps: sequential await — rollback on failure
- Dashboard widgets: `Promise.allSettled` — one failed widget не ламає всю сторінку

## Документація

- [Promise — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Promise.all — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
