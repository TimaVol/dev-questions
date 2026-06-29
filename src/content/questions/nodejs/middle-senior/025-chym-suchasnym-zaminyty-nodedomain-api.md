---
title: "Чим сучасним замінити node:domain API?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 25
difficulty: medium
---

## Відповідь

`domain` deprecated — некоректно перехоплював помилки через async boundaries, memory leaks, не працював з Promise natively. Замінники: **`AsyncLocalStorage`** — поширення контексту (requestId, user) через async chain; **`try/catch` + `async/await`** — явна обробка помилок; **`process.on('unhandledRejection')`** — глобальна страховка (не заміна, а останній рубіж); frameworks (Express error middleware, Fastify hooks). Для групування помилок на request — ALS + централізований error handler, не domain.bind().

## Приклад

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const als = new AsyncLocalStorage();

app.use((req, res, next) => {
  als.run({ req }, () => {
    res.on('close', () => cleanup(als.getStore()));
    next();
  });
});

app.use((err, req, res, next) => {
  const ctx = als.getStore();
  logger.error({ err, requestId: ctx?.req.id });
  res.status(500).json({ error: 'internal' });
});
```

## Юз кейси

- Міграція legacy Express 3 apps з domains
- Кореляція помилок на request у логах
- Cleanup multi-step saga при збої

## Документація

- [AsyncLocalStorage — Node.js](https://nodejs.org/api/async_context.html#class-asynclocalstorage)
