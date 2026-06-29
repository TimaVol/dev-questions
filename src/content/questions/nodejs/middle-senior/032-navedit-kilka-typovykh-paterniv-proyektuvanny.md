---
title: "Наведіть кілька типових патернів проєктування з GoF і приклади їхнього використання у Node.js."
topic: nodejs
grade: middle-senior
category: "Запитання для прикладного програміста на Node.js"
order: 32
difficulty: hard
---

## Відповідь

**Observer** — `EventEmitter` (on/emit). **Strategy** — взаємозамінний logger/transport (`winston.transports`). **Factory** — `createServer`, `Readable.from()`. **Decorator** — ланцюжок middleware Express `(req,res,next)`. **Adapter** — `stream.Readable.from(webStream)` для потоків Web↔Node. **Singleton** — кеш модулів (з'єднання з БД). **Facade** — `fs/promises` над callback fs. **Proxy** — `Proxy` для lazy loading ORM. Не over-engineer — патерн коли є реальна точка варіації або біль від зв'язування.

## Приклад

```js
// Strategy: interchangeable hash algorithms
const strategies = {
  bcrypt: (pw) => bcrypt.hash(pw, 12),
  argon2: (pw) => argon2.hash(pw),
};
async function hashPassword(pw, algo = 'argon2') {
  return strategies[algo](pw);
}

// Decorator: logging middleware wraps handler
const withLog = (fn) => (req, res, next) => {
  console.log(req.method, req.url);
  return fn(req, res, next);
};
```

## Юз кейси

- Plugin-архітектура (Strategy + Factory)
- HTTP middleware stacks (Decorator)
- Внутрішня event-driven архітектура мікросервісів (Observer)

## Документація

- [Design Patterns](https://refactoring.guru/design-patterns)
