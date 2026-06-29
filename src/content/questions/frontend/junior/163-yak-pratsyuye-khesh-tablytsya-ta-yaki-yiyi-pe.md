---
title: "Як працює хеш-таблиця та які її переваги і недоліки?"
topic: frontend
grade: junior
category: "Алгоритми та структури даних"
order: 163
difficulty: easy
---

## Відповідь

Хеш-таблиця (Map/Set у JS) зберігає пари ключ-значення через хеш-функцію. Середній час: O(1) для get/set/has. Мінуси: колізії, більше пам'яті, ключі лише примітиви або об'єкти за посиланням.

## Приклад

```js
const index = new Map();
for (const user of users) index.set(user.id, user);
index.get(42); // O(1)
```

## Юз кейси

- Індекс користувачів за ID для швидкого lookup
- `Set` для відстеження відвіданих сторінок

## Документація

- [Map — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Map)
