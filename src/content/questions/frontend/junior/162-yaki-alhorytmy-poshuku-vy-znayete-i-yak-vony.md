---
title: "Які алгоритми пошуку ви знаєте і як вони відрізняються один від одного?"
topic: frontend
grade: junior
category: "Алгоритми та структури даних"
order: 162
difficulty: easy
---

## Відповідь

Лінійний — O(n), перебір усіх елементів. Бінарний — O(log n), лише на відсортованому масиві. Хеш-пошук — O(1) через Map/Set. Бінарний швидший, але потребує сортування.

## Приклад

```js
// Лінійний
arr.find(x => x.id === targetId);

// Бінарний (масив відсортований)
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    arr[mid] < target ? lo = mid + 1 : hi = mid - 1;
  }
  return -1;
}
```

## Юз кейси

- `Set.has` для перевірки унікальності
- Бінарний пошук у відсортованому списку ID

## Документація

- [Big O — Wikipedia](https://en.wikipedia.org/wiki/Time_complexity)
- [Linear search — Wikipedia](https://en.wikipedia.org/wiki/Linear_search)
