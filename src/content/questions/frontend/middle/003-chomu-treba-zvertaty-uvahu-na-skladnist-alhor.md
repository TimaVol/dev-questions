---
title: "Чому треба звертати увагу на складність алгоритму?"
topic: frontend
grade: middle
category: "Загальні запитання"
order: 3
difficulty: medium
---

## Відповідь

Big O показує, як зростає час/пам'ять при збільшенні даних. O(n²) на 50 записах «працює», на проді — падає. На фронті критично для великих списків, дерев категорій, JSON.

## Приклад

```js
function hasDuplicateFast(ids) {
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) return true;
    seen.add(id);
  }
  return false;
}
```

## Юз кейси

- Віртуалізація списку замість 10 000 DOM-вузлів
- Map для O(1) lookup категорій
- Оцінка складності на live-coding

## Документація

- [Big O notation — Wikipedia](https://en.wikipedia.org/wiki/Big_O_notation)
- [Time complexity — Wikipedia](https://en.wikipedia.org/wiki/Time_complexity)
