---
title: "Як виконується асинхронний код у JavaScript?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 81
difficulty: hard
---

## Відповідь

JS однопотоковий: синхронний код виконується в call stack, асинхронні задачі (fetch, setTimeout) йдуть у Web APIs, потім callback потрапляє в callback queue, event loop передає його в stack коли він вільний.

## Приклад

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// 1, 3, 2
```

## Юз кейси

- Чому `setTimeout(fn, 0)` не виконується миттєво
- Розуміння порядку виконання після `await fetch()`

## Документація

- [async/await — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
