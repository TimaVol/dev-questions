---
title: "Для чого використовують new Error.captureStackTrace?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 18
difficulty: hard
---

## Відповідь

V8-specific API (Node `node:util` re-export): будує `error.stack`, **виключаючи** поточну функцію і все до `constructorOpt`. Використовують custom Error classes — stack показує місце **виклику** `new CustomError()`, а не внутрішній constructor. Другий аргумент `constructorOpt` — function, stack trace починається «нижче» неї. Покращує DX у library code (assert, validation errors). Стандартний `Error` stack включає constructor frame — шум для wrapper errors.

## Приклад

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    Error.captureStackTrace(this, ValidationError);
  }
}

function validate(input) {
  if (!input) throw new ValidationError('input required');
  // stack вказує на validate(), не на ValidationError constructor
}
```

## Юз кейси

- Custom error hierarchies у framework (Fastify, Nest)
- Assertion libraries (node:assert patterns)
- Приховування internal frames у public API

## Документація

- [Errors — Node.js](https://nodejs.org/api/errors.html)
