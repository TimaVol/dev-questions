---
title: "Яке API реалізує nodejs/undici?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 26
difficulty: medium
---

## Відповідь

Undici — HTTP/1.1 client від Node team; з Node 18 **`fetch`/`Request`/`Response`/`Headers`** глобально — реалізація на undici. Також: `undici.request()`, `Agent`, `Pool`, `MockAgent` для тестів, підтримка HTTP/2, connection pooling, pipelining. Швидший за legacy `http.request` для high-concurrency. `FormData`, `File`, `Blob` — сумісність з Web API. Для low-level — модуль `undici`; для типового — глобальний `fetch`.

## Приклад

```js
// Global fetch (undici under the hood)
const res = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ name: 'Ann' }),
});
const users = await res.json();

// Low-level: custom Agent з keep-alive pool
import { Agent, request } from 'undici';
const agent = new Agent({ connections: 100 });
const { statusCode, body } = await request('https://api.example.com', { dispatcher: agent });
```

## Юз кейси

- Високопропускний вихідний HTTP (microservices mesh)
- SSR data fetching в Node без node-fetch polyfill
- Mock HTTP в integration tests (`MockAgent`)

## Документація

- [undici — GitHub](https://github.com/nodejs/undici)
