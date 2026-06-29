---
title: "Як пов'язані node:async_hooks і AsyncLocalStorage?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 8
difficulty: hard
---

## Відповідь

`async_hooks` — низькорівневий API: callbacks `init/before/after/destroy` на кожен async resource (Promise, TCP, Timer). Дає asyncId і triggerAsyncId — граф асинхронних зв'язків. `AsyncLocalStorage` (ALS) — **високорівнева обгортка** над async_hooks: зберігає key-value store, прив'язаний до async context chain. `als.run(store, () => { ... })` — усі наступні async операції в цьому ланцюжку бачать `store.get()`. Замінює deprecated `domain` і ручний propagation requestId через параметри.

## Приклад

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const als = new AsyncLocalStorage();

function middleware(req, res, next) {
  als.run({ requestId: crypto.randomUUID() }, () => next());
}

function log(msg) {
  const ctx = als.getStore();
  console.log(`[${ctx?.requestId}] ${msg}`);
}

// log('done') всередині async handler бачить requestId без явної передачі
```

## Юз кейси

- Distributed tracing (requestId, spanId у логах)
- Tenant isolation у multi-tenant SaaS
- ORM/query context (userId для row-level security)

## Документація

- [AsyncLocalStorage — Node.js](https://nodejs.org/api/async_context.html#class-asynclocalstorage)
- [async_hooks — Node.js](https://nodejs.org/api/async_hooks.html)
