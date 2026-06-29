---
title: "Навіщо використовують AbortController? В яких API він підтримується?"
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 24
difficulty: hard
---

## Відповідь

`AbortController` + `AbortSignal` — стандартне скасування асинхронних операцій. `controller.abort(reason)` → signal.aborted + подія `'abort'`. Підтримка в Node: `fetch` (undici), `fs` (readFile, watch), запити `http`/`https`, `stream.Readable.from`, таймери, дочірні процеси, test runner. Один signal — багато слухачів (timeout + скасування користувачем). `AbortSignal.timeout(ms)` / `AbortSignal.any([...])` — Node 17+. Замінює ad-hoc `destroy()` та boolean flags.

## Приклад

```js
const ac = new AbortController();
setTimeout(() => ac.abort(new Error('timeout')), 5000);

const res = await fetch('https://api.example.com/data', {
  signal: ac.signal,
});

// fs з signal
const data = await fs.readFile('huge.bin', { signal: ac.signal });
```

## Юз кейси

- Timeout запиту в HTTP handlers
- Graceful shutdown — abort операцій у процесі
- Скасування довгого DB query при відключенні клієнта

## Документація

- [AbortController — MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
