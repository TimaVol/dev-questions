---
title: "Які ви знаєте deprecated API та якою є стратегія їх виведення з використання?"
topic: nodejs
grade: middle-senior
category: "Запитання для системного програміста"
order: 19
difficulty: hard
---

## Відповідь

Приклади застарілих API: `domain`, `fs.exists`, `new Buffer()`, `process.binding()`, `require('sys')`, `url.parse()` (legacy), `crypto.createCredentials`. Політика Node LTS: **документаційне застарівання** → **попередження під час виконання** (`process.emitWarning`, `--pending-deprecation`) → **видалення після EOL** (major version). Semver major для breaking removals. Посібники з міграції в документації. `--throw-deprecation` / `--trace-deprecation` для CI. Альтернативи: `AsyncLocalStorage` замість domain, `fs.access`/`stat` замість exists, `Buffer.from` замість `new Buffer`.

## Приклад

```js
// CI: fail on deprecated API usage
// node --throw-deprecation app.js

process.on('warning', (w) => {
  if (w.name === 'DeprecationWarning') {
    console.error(w);
    process.exit(1);
  }
});

// Замість new Buffer(data)
const buf = Buffer.from(data, 'utf8');
```

## Юз кейси

- Оновлення Node LTS у production (18 → 20 → 22)
- ESLint `no-deprecated-api` / codemods
- Аудит legacy codebase перед EOL

## Документація

- [Node.js — Deprecations](https://nodejs.org/api/deprecations.html)
