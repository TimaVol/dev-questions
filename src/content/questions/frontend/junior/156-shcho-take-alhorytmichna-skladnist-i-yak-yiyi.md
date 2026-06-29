---
title: "Що таке алгоритмічна складність і як її оцінювати?"
topic: frontend
grade: junior
category: "Алгоритми та структури даних"
order: 156
difficulty: hard
---

## Відповідь

Big O описує, як зростає час/пам'ять при збільшенні input. O(1) — константа, O(n) — лінійно, O(n²) — квадратично. Оцінюй найгірший випадок, ігноруй константи.

## Приклад

```js
// O(n) — один прохід
function sum(arr) {
  let total = 0;
  for (const n of arr) total += n;
  return total;
}

// O(n²) — вкладені цикли
function pairs(arr) {
  for (const a of arr)
    for (const b of arr) { /* ... */ }
}
```

## Юз кейси

- `Array.includes` у циклі — O(n²), краще `Set.has` — O(1)
- Вибір структури даних за складністю операцій

## Документація

- [Big O — Wikipedia](https://en.wikipedia.org/wiki/Time_complexity)
