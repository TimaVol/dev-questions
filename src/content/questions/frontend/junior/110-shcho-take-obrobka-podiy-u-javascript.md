---
title: "Що таке обробка подій у JavaScript?"
topic: frontend
grade: junior
category: "API браузера"
order: 110
difficulty: easy
---

## Відповідь

Event handling — реакція на дії користувача (click, input, submit) або браузера (load, resize). `addEventListener(type, handler)` — рекомендований спосіб, можна кілька listenerів і `removeEventListener`.

## Приклад

```js
const input = document.querySelector('#search');
input.addEventListener('input', (e) => {
  console.log(e.target.value);
});
```

## Юз кейси

- Валідація форми на `blur`
- Закриття dropdown по `click` поза елементом

## Документація

- [addEventListener — MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Event — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event)
