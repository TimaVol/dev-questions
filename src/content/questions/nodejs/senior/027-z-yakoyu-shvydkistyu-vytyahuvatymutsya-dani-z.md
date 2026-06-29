---
title: "З якою швидкістю витягуватимуться дані за ключем зі звичайного JavaScript об’єкта? Поясніть, що це за структура даних і як вона працює?"
topic: nodejs
grade: senior
category: "JavaScript"
order: 27
difficulty: hard
---

## Відповідь

Звичайний об'єкт (`{}`) у V8 — hash table + hidden classes (Shapes/Maps). **Середній випадок O(1)** для `obj[key]` зі string/symbol keys. V8 оптимізує об'єкти зі стабільною формою (однакові keys у порядку створення) — inline properties замість dictionary mode.

**Dictionary mode** (видалення keys, довільне додавання) — повільніший lookup. Integer-подібні keys можуть поводитися як елементи масиву. `Map` краще для частого add/delete keys або non-string keys.

На senior-інтерв'ю: порівняйте з `Map` (гарантований O(1) у середньому, порядок ітерації за вставкою), `WeakMap` для metadata без витоку пам'яті.

## Приклад

```js
const user = { id: '1', email: 'a@b.c', role: 'admin' };
user.email; // fast — monomorphic shape

// Deoptimization trigger
delete user.role;
user[Math.random()] = 1; // dictionary mode

const cache = new Map(); // краще для dynamic key sets
cache.set(sessionId, sessionData);
```

## Юз кейси

- In-memory session store: Map vs object для 100k сесій
- Діагностика deopt V8 через `--trace-deopt`
- Вибір структури для зберігання bucket'ів rate limiter

## Документація

- [Object — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
