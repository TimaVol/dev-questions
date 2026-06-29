---
title: "Як виявляєте та ізолюєте помилки в коді? Які інструменти для відладки використовуєте?"
topic: frontend
grade: middle
category: "Тести"
order: 98
difficulty: medium
---

## Відповідь

Починаю з відтворення локально: breakpoints, Network tab, React DevTools Profiler. `console` і structured logging для trace. У проді — Sentry з source maps. Для регресій — `git bisect`. Ізоляція: binary search — відключаю половину коду, поки баг не зникне.

## Приклад

```js
// Тимчасово для trace (не в prod)
console.trace('state before submit', formState);

// DevTools: breakpoint на зміну React state
```

## Юз кейси

- `git bisect` знайшов коміт, що зламав checkout
- React DevTools: чому компонент re-renderився 50 разів
- Sentry stack trace з source map на продакшені

## Документація

- [Chrome DevTools — Docs](https://developer.chrome.com/docs/devtools)
- [debugger — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger)
