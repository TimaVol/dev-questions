---
title: "У чому відмінності LocalStorage від SessionStorage? Як ви використовуєте LocalStorage та SessionStorage в JavaScript? У яких випадках вважаєте їхнє використання доцільним?"
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 74
difficulty: medium
---

## Відповідь

`localStorage` — дані зберігаються між сесіями, ~5MB. `sessionStorage` — лише на час вкладки. Обидва — синхронні, string-only. Не для токенів і паролів — доступний будь-якому JS на сторінці.

## Приклад

```js
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
sessionStorage.setItem('draft', JSON.stringify(formData));
```

## Юз кейси

- `localStorage` — тема UI, мова інтерфейсу
- `sessionStorage` — чернетка форми до закриття вкладки

## Документація

- [localStorage — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
