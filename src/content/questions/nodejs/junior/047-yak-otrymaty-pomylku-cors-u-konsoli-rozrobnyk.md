---
title: "Як отримати помилку CORS у консолі розробника?"
topic: nodejs
grade: junior
category: "WEB"
order: 47
difficulty: easy
---

## Відповідь

Помилка CORS з'являється в DevTools → Console, коли браузер блокує cross-origin відповідь: типово *«Access to fetch at '...' from origin '...' has been blocked by CORS policy»*. Сервер міг відповісти 200, але без потрібного `Access-Control-Allow-Origin`. Відтворити: фронт на одному порту, `fetch` на інший без CORS middleware. Postman/curl CORS не перевіряють — лише браузер.

## Приклад

```js
// Frontend (http://localhost:5173)
fetch('http://localhost:3000/api/users')
  .then((r) => r.json())
  .catch(console.error);
// Console: CORS policy blocked — якщо API без заголовків

// Fix на Node API:
app.use(cors({ origin: 'http://localhost:5173' }));
```

## Юз кейси

- Локальна розробка SPA + Express на різних портах
- Забули `OPTIONS` handler для preflight
- `Allow-Origin: *` не працює з `credentials: true`

## Документація

- [CORS — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
