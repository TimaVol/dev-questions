---
title: "Що таке CLS і де варто його використовувати?"
topic: nodejs
grade: senior
category: "Архітектура"
order: 22
difficulty: hard
---

## Відповідь

**Continuation-Local Storage (CLS)** — неявний контекст, що «пливе» через асинхронний ланцюжок викликів без явної передачі параметра. У Node.js — `AsyncLocalStorage` (async_hooks): зберігання requestId, userId, tenantId, транзакції БД.

Сценарії: кореляція структурованих логів, маршрутизація multi-tenant, request-scoped з'єднання/транзакція БД (middleware TypeORM/Prisma), поширення tracing span. Антипатерн: глобальний mutable state для бізнес-даних.

Не плутати з thread-local storage — ALS працює в однопотоковій async-моделі. Потрібно `als.run(store, () => ...)` на точці входу (HTTP middleware).

## Приклад

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const requestContext = new AsyncLocalStorage();

app.use((req, res, next) => {
  requestContext.run({ requestId: req.headers['x-request-id'] ?? crypto.randomUUID() }, next);
});

function getRequestId() {
  return requestContext.getStore()?.requestId;
}

// Deep in service layer — no req param needed
logger.info({ requestId: getRequestId() }, 'Processing order');
```

## Юз кейси

- Автоматичне додавання traceId у всі рядки логів pino
- Ізоляція tenant без передачі tenantId через 10 шарів функцій
- Патерн Unit of Work з областю видимості транзакції

## Документація

- [AsyncLocalStorage — Node.js](https://nodejs.org/api/async_context.html#class-asynclocalstorage)
