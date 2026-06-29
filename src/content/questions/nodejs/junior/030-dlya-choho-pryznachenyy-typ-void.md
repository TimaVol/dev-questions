---
title: "Для чого призначений тип void?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 30
difficulty: easy
---

## Відповідь

У **JavaScript** оператор `void expr` обчислює вираз і повертає `undefined` (наприклад, `void 0` для гарантованого undefined). У **TypeScript** тип `void` означає, що функція нічого корисного не повертає (або повертає `undefined`). Відрізняється від `never` (функція ніколи не завершується).

## Приклад

```js
// JS: void у старих патернах (зараз рідко)
<a href="javascript:void(0)">click</a>

// TS-стиль у Node
function logError(msg) {
  console.error(msg);
  // implicit return undefined — тип void
}
```

```ts
type Handler = (req: Request, res: Response) => void;
```

## Юз кейси

- TS: типізація Express middleware без return value
- Відрізнити «нічого не повертає» від «повертає any»
- `void` у generic constraints для side-effect callbacks

## Документація

- [void — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void)
