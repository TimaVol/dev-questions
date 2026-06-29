---
title: "У чому основна різниця чи схожість у роботі вебсерверів на Node.js або, наприклад, на Apache (PHP)?"
topic: nodejs
grade: senior
category: "Архітектура"
order: 16
difficulty: hard
---

## Відповідь

**Apache+PHP (mod_php / FPM)**: process/thread per request або pool; код blocking by default; shared-nothing між requests (окремий lifecycle). Проста mental model, але memory per worker.

**Node.js**: один event loop на процес; non-blocking I/O за замовчуванням; довгоживучий процес з shared memory (ризик leaks). Конкурентність через async, не threads.

**Схожість**: обидва HTTP request → handler → response; middleware/filters chain; можуть стояти за nginx reverse proxy.

**Senior insight**: Node ефективний при багато одночасних idle/slow I/O connections; PHP-FPM competitive на CPU-light CRUD з opcode cache. Node вимагає дисципліни щодо blocking code.

## Приклад

```js
// Node: 10k concurrent connections на одному процесі (I/O wait)
server.on('connection', (socket) => {
  handleRequest(socket); // async, не блокує інші
});
```

## Юз кейси

- Аргументація tech stack для high-concurrency API gateway
- Міграція PHP monolith → Node microservice
- Пояснення, чому sync bcrypt у Node handler — гірше ніж у PHP worker pool

## Документація

- [HTTP module — Node.js](https://nodejs.org/api/http.html)
- [Blocking vs non-blocking — Node.js](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking)
