---
title: "Як можна реалізувати «глибоку заморозку об’єкта у JavaScript»?"
topic: frontend
grade: senior
category: "Алгоритми і структури даних"
order: 88
difficulty: medium
---

## Відповідь

`Object.freeze` — лише shallow. Deep freeze — рекурсивний обхід, `Object.freeze` кожного object/array, цикли через **WeakSet** visited. Обмеження: не freeze nested class instances глибоко за замовчуванням, getters все ще виконуються, можна замінити property frozen object, якщо parent не frozen. Альтернатива: **immutable libraries** (Immer produce, Immutable.js). Застосування: config constants, state snapshots, dev-mode immutability checks.

## Приклад

```js
function deepFreeze(obj, seen = new WeakSet()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return obj; // cycle
  seen.add(obj);

  Object.freeze(obj);
  for (const value of Object.values(obj)) {
    deepFreeze(value, seen);
  }
  return obj;
}

const config = deepFreeze({
  api: { baseUrl: 'https://api.example.com', timeout: 5000 },
  features: { darkMode: true },
});

config.api.timeout = 9999; // fails silently in strict mode — TypeError in strict assignment
config.api.newKey = 1;     // fails
```

Immer for practical immutability:

```js
import { produce } from 'immer';
const next = produce(state, draft => { draft.user.name = 'Оля'; });
```

## Юз кейси

- Redux dev: deepFreeze state у dev для виявлення mutations
- Plugin config завантажується раз — deepFreeze запобігає випадковим runtime edits
- Snapshot testing: freeze expected object перед compare

## Документація

- [Object.freeze — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- [structuredClone — MDN](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
