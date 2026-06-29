---
title: "Що таке делегування подій у DOM, як ви використовуєте цей підхід для оптимізації обробки подій, особливо на великих сторінках?"
topic: frontend
grade: junior
category: "API браузера"
order: 112
difficulty: easy
---

## Відповідь

Event delegation — один listener на батьківському елементі замість сотень на дочірніх. Використовує bubbling: перевіряєш `event.target`. Працює і для динамічно доданих елементів.

## Приклад

```js
document.querySelector('#list').addEventListener('click', (e) => {
  const btn = e.target.closest('.delete-btn');
  if (btn) removeItem(btn.dataset.id);
});
```

## Юз кейси

- Таблиця на 1000 рядків — один listener на `<tbody>`
- Todo-list з динамічним додаванням пунктів

## Документація

- [Event delegation — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling#event_delegation)
- [addEventListener — MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
