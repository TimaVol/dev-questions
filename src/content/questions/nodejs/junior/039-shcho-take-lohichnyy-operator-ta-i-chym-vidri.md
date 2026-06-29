---
title: "Що таке логічний оператор && та || і чим відрізняються ці оператори від логічного оператора «??»."
topic: nodejs
grade: junior
category: "JavaScript"
order: 39
difficulty: easy
---

## Відповідь

`&&` і `||` — short-circuit: повертають **останній обчислений операнд**, не обов'язково boolean. `a && b` — якщо `a` falsy, повертає `a`, інакше `b`. `a || b` — якщо `a` truthy, повертає `a`, інакше `b`.

`??` (nullish coalescing) — fallback лише для `null` і `undefined`, не для `0`, `''`, `false`.

## Приклад

```js
const port = process.env.PORT || 3000;     // '' → 3000 (може бути небажано)
const port2 = process.env.PORT ?? 3000;  // '' залишається ''

const limit = req.query.limit && Number(req.query.limit);
// undefined якщо limit відсутній

const name = user.nickname ?? user.email ?? 'Guest';
```

## Юз кейси

- `??` для default config без з'їдання `0` і `false`
- `&&` для умовного middleware: `isDev && devRoutes(app)`
- Уникати `||` для числових default, де `0` валідний

## Документація

- [Logical operators — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)
- [?? operator — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
