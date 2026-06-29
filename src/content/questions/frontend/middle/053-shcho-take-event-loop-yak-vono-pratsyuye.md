---
title: "Що таке event loop? Як воно працює?"
topic: frontend
grade: middle
category: "JavaScript"
order: 53
difficulty: medium
---

## Відповідь

JS однопотоковий: call stack → microtasks (Promise) → macrotasks (setTimeout, I/O). Event loop бере завдання з черг, поки stack порожній. Node.js додає фази libuv.

## Приклад

```js
console.log('1');
Promise.resolve().then(() => console.log('2'));
setTimeout(() => console.log('3'), 0);
console.log('4');
// 1, 4, 2, 3
```

## Юз кейси

- Дебаг порядку async/await
- Чому setTimeout(0) не миттєвий
- Неблокуючий I/O в Node

## Документація

- [Event loop — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [Concurrency model — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
