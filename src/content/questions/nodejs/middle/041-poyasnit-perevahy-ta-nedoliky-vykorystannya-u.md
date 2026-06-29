---
title: "Поясніть переваги та недоліки використання «use strict»."
topic: nodejs
grade: middle
category: "JavaScript"
order: 41
difficulty: medium
---

## Відповідь

**`"use strict"`** — режим ES5, що робить JS суворішим:

Переваги:
- Забороняє неявні globals (`x = 1` без var → error)
- `this` у plain functions = `undefined` (не global object)
- Заборона duplicate parameter names
- `delete` на non-configurable property → error
- Безпечніший код, легше ловити баги

Недоліки: legacy code може зламатися; деякі оптимізації irrelevant у modules (ESM strict by default).

У Node.js: ESM і CommonJS modules автоматично strict. Top-level `"use strict"` потрібен лише в scripts.

## Приклад

```js
'use strict';

function bad() {
  mistypedVar = 42; // ReferenceError — без strict створило б global
}

// У strict: this === undefined
function showThis() {
  console.log(this); // undefined, не global
}
```

## Юз кейси

- Legacy script migration — поступове додавання strict
- ESLint `strict` rule для consistency
- ESM projects — strict автоматично, explicit не потрібен

## Документація

- [Strict mode — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
