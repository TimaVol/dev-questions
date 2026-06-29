---
title: "Для чого потрібен this і в яких випадках його використовувати?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 32
difficulty: easy
---

## Відповідь

`this` — контекст виклику функції, не місце оголошення (крім arrow). У методі об'єкта — сам об'єкт. У звичайній функції — `global`/`undefined` (strict). Arrow function не має власного `this` — бере з оточення (lexical). Явне прив'язування: `fn.call(ctx)`, `fn.apply(ctx)`, `fn.bind(ctx)`.

## Приклад

```js
const logger = {
  prefix: '[app]',
  log(msg) {
    console.log(this.prefix, msg);
  },
};

logger.log('started'); // [app] started

const broken = logger.log;
broken('x'); // undefined x — втрачений this

const fixed = logger.log.bind(logger);
fixed('ok'); // [app] ok
```

## Юз кейси

- Методи класів і сервісів з доступом до `this.db`
- Arrow у callback, щоб зберегти `this` класу
- `bind` для передачі методу як callback без втрати контексту

## Документація

- [this — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Operators/this)
