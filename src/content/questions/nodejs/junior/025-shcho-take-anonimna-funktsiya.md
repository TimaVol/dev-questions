---
title: "Що таке анонімна функція?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 25
difficulty: easy
---

## Відповідь

Анонімна функція — функція без імені, зазвичай передається як аргумент або присвоюється змінній. Це callback у `array.map`, middleware в Express, обробник подій. Arrow functions теж часто анонімні. Ім'я з'являється лише при function expression з присвоєнням: `const fn = function helper() {}` — `helper` лише всередині функції.

## Приклад

```js
const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2);

app.use((req, res, next) => {
  req.startedAt = Date.now();
  next();
});
```

## Юз кейси

- Middleware і route handlers у Express
- Callbacks у `fs.readFile(path, (err, data) => ...)`
- Event listeners: `emitter.on('data', (chunk) => ...)`

## Документація

- [Functions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
