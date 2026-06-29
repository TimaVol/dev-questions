---
title: "Коли ми можемо використовувати синхронні версії операцій з файлами з node:fs замість асинхронних? На що звертати увагу, ухвалюючи таке рішення?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 27
difficulty: medium
---

## Відповідь

Sync fs (`readFileSync`, `existsSync`) — **лише на startup/bootstrap**: load config, read TLS certs, CLI one-shot scripts. Блокує event loop на весь час I/O — у web server під навантаженням це catastrophically. Libuv thread pool не рятує sync fs у main thread — блок саме JS thread. Прийнятно: короткі файли (< few KB), один раз при init, до `listen()`. Ніколи: per-request file reads. Альтернатива startup: async init phase перед accepting traffic.

## Приклад

```js
// OK: startup, до accept connections
function loadConfig() {
  return JSON.parse(fs.readFileSync('./config.json', 'utf8'));
}

const config = loadConfig();
const server = createServer(handler);
server.listen(config.port);

// Погано: sync fs у request handler
function handler(req, res) {
  const tpl = fs.readFileSync('./template.html'); // blocks all clients
  res.end(tpl);
}
```

## Юз кейси

- CLI tools (node script.js — sync OK, process exits)
- Container entrypoint config load
- Electron main process init (before window)

## Документація

- [fs — Node.js](https://nodejs.org/api/fs.html)
- [Blocking vs non-blocking — Node.js](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking)
