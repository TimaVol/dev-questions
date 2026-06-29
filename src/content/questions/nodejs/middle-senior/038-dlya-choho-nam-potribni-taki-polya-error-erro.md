---
title: "Для чого нам потрібні такі поля Error: error.cause, error.code, error.message, error.stack?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 38
difficulty: easy
---

## Відповідь

**`message`** — опис для людей; для логів і API responses (санітизований). **`stack`** — V8 call stack у місці throw; debugging, групування в Sentry; не показувати клієнтам у prod. **`code`** — machine-readable ідентифікатор; системні помилки Node (`ENOENT`, `ECONNREFUSED`), власні коди застосунку (`VALIDATION_ERROR`); для programmatic handling. **`cause`** (ES2022) — вкладений ланцюжок помилок; wrapper throws з `{ cause: original }` — повний контекст без flattening. Разом: структуроване логування, таксономія помилок, observability.

## Приклад

```js
try {
  await fs.readFile('/missing.json');
} catch (err) {
  const wrapped = new Error('Config load failed', { cause: err });
  console.error(wrapped.message);  // Config load failed
  console.error(wrapped.cause.code); // ENOENT
  console.error(wrapped.stack);    // stack at wrap site
  console.error(wrapped.cause.stack); // original stack
}
```

## Юз кейси

- Запис помилок OpenTelemetry з ланцюжком cause
- Мапінг API помилок (`ENOENT` → 404, `EACCES` → 403)
- Розрізнення retryable vs fatal infra errors за `code`

## Документація

- [Error — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [Errors — Node.js](https://nodejs.org/api/errors.html)
