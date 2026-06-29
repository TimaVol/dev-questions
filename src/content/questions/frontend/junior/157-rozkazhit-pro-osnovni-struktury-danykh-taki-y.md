---
title: "Розкажіть про основні структури даних, такі як масиви, списки, стеки, черги, хеш-таблиці та дерева."
topic: frontend
grade: junior
category: "Алгоритми та структури даних"
order: 157
difficulty: easy
---

## Відповідь

Масив — індексований доступ O(1). Стек — LIFO (undo). Черга — FIFO (черга задач). Хеш-таблиця (Map/Set) — O(1) пошук. Дерево — ієрархія (DOM, файлові системи).

## Приклад

```js
const stack = [];
stack.push(1); stack.push(2);
stack.pop(); // 2 — останній доданий

const seen = new Set([1, 2, 3]);
seen.has(2); // O(1)
```

## Юз кейси

- `Set` — дедуплікація ID
- Стек — історія навігації undo

## Документація

- [Map — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Array — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array)
