---
title: "Як можна реалізувати серіалізацію об’єкта, який містить циклічні посилання?"
topic: frontend
grade: senior
category: "Алгоритми і структури даних"
order: 89
difficulty: medium
---

## Відповідь

`JSON.stringify` падає на cycles. Рішення: **replacer + WeakSet** відстежує visited, замінює cycle на marker або `$ref`; **`structuredClone`** для in-memory copy (cycles, не JSON); бібліотеки **flatted**, **devalue** (SvelteKit). Deserialize потребує reviver для відновлення refs. Custom format: id об'єктам, serialize `{ refs: [...], root: 0 }`. Також: `Date`, `Map`, `Set`, `undefined`, `BigInt` — JSON не підтримує нативно.

## Приклад

```js
function stringifyCircular(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  });
}

const a = { name: 'root' };
a.self = a;
stringifyCircular(a); // {"name":"root","self":"[Circular]"}
```

With reference restoration:

```js
function decycle(obj) {
  const objs = [];
  const paths = [];
  return JSON.stringify(obj, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      const found = objs.indexOf(value);
      if (found !== -1) return { $ref: paths[found] };
      objs.push(value);
      paths.push(JSON.stringify(this) + (key ? `.${key}` : ''));
    }
    return value;
  });
}
```

## Юз кейси

- Debug log React component tree з parent refs — safe stringify для Sentry
- Persist graph UI (nodes з edges) — custom JSON schema з id refs
- Worker postMessage: structuredClone graph — без serialization same-origin

## Документація

- [JSON.stringify — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [Cyclic object value — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value)
