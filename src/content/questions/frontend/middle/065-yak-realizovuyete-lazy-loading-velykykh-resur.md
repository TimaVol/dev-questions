---
title: "Як реалізовуєте lazy loading великих ресурсів, таких як зображення або скрипти, для оптимізації завантаження сторінок? Як це взаємодіє з асинхронним кодом?"
topic: frontend
grade: middle
category: "JavaScript"
order: 65
difficulty: medium
---

## Відповідь

Зображення — `loading="lazy"` і Intersection Observer для below-the-fold. JS-модулі — dynamic `import()` з async/await. Важкі обчислення не блокую main thread — Web Worker. Hero-ресурси завантажую без lazy, щоб не гіршити LCP.

## Приклад

```js
button.addEventListener('click', async () => {
  const { initEditor } = await import('./monaco-editor');
  initEditor();
});
```

## Юз кейси

- Lazy-завантаження редактора коду лише в адмінці
- Code-splitting маршруту `/settings`
- IO-тригер для підвантаження зображень у довгій стрічці

## Документація

- [async/await — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Code splitting — web.dev](https://web.dev/learn/performance/code-split-javascript)
