---
title: "Як зрозуміти, чи є у вашому коді/застосунку витоки пам’яті (memory leaks)?"
topic: nodejs
grade: senior
category: "JavaScript"
order: 31
difficulty: hard
---

## Відповідь

Витік пам'яті в Node — об'єкти залишаються reachable для GC через залишкові посилання: незняті `EventEmitter` listeners, замикання над великими об'єктами `req`, глобальний `Map`-кеш без eviction, таймери без `clearInterval`, detached DOM-подібні патерни в SSR.

**Виявлення**: моніторинг тренду heap (RSS/heapUsed зростає після циклів GC); `node --inspect` + heap snapshots diff у Chrome DevTools; `clinic doctor`, `memwatch-next`; навантажувальний тест + порівняння snapshots.

**Профілактика**: WeakMap для metadata, TTL-кеші, `removeListener`/`AbortController`, уникати зберігання повного request у module scope, обмежувати розміри пулів.

## Приклад

```js
// Leak: listeners accumulate per request
function badHandler(req, res) {
  process.on('SIGUSR2', () => debug(req.body)); // never removed
}

// Fix: scoped listener + cleanup
function goodHandler(req, res) {
  const onSignal = () => debug(req.body);
  process.once('SIGUSR2', onSignal);
  res.on('close', () => process.removeListener('SIGUSR2', onSignal));
}
```

## Юз кейси

- Production pod OOMKilled після 48 год uptime
- WebSocket-сервер з тисячами перепідключень
- Аудит глобальних singleton-кешів у long-running worker

## Документація

- [Memory — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory)
