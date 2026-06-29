---
title: "Що таке Symbol? Яке його практичне застосування?"
topic: frontend
grade: senior
category: "JavaScript"
order: 42
difficulty: easy
---

## Відповідь

`Symbol` — примітив унікального ідентифікатора (`Symbol('desc') !== Symbol('desc')`). Не enumerable in `for...in` / `Object.keys`. Застосування: **well-known symbols** (`Symbol.iterator`, `Symbol.toStringTag`), **private-like keys** на objects без collision з library code, **constants** для internal state, **React** (`$$typeof`). `Symbol.for()` / `Symbol.keyFor()` — global registry. Не серіалізується в JSON.

## Приклад

```js
const ID = Symbol('id');
const user = { name: 'Оля', [ID]: 42 };

Object.keys(user); // ['name'] — Symbol hidden
user[ID]; // 42

// Custom iterator
const range = {
  from: 1, to: 3,
  [Symbol.iterator]() {
    let cur = this.from;
    const end = this.to;
    return { next() { return cur <= end ? { value: cur++, done: false } : { done: true }; } };
  },
};
[...range]; // [1, 2, 3]

// Metaprogramming hook
class Collection {
  [Symbol.toStringTag] = 'Collection';
}
Object.prototype.toString.call(new Collection()); // [object Collection]
```

## Юз кейси

- Plugin architecture: `obj[PLUGIN_META] = {...}` без clash з user keys
- Immutable metadata на frozen objects
- Library internals: React element type check через `$$typeof`

## Документація

- [Symbol — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
