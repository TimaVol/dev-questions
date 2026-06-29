---
title: "Як ви працюєте з асинхронним кодом у JavaScript без використання async/await? Які інші підходи ви розглядаєте для роботи з асинхронністю?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 82
difficulty: easy
---

## Відповідь

До async/await — callbacks (callback hell) і Promises з `.then()/.catch()`. Зараз async/await — стандарт, але під капотом це все одно Promises.

## Приклад

```js
fetch('/api/user')
  .then((res) => res.json())
  .then((user) => console.log(user.name))
  .catch((err) => console.error(err));
```

## Юз кейси

- Ланцюжок кількох API-запитів через `.then()`
- `Promise.all()` для паралельних запитів

## Документація

- [Promise — MDN](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Callbacks — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)
