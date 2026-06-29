---
title: "Що таке event bubbling та event capturing у контексті обробки подій у DOM? Як використовуєте ці концепції для ефективної обробки подій?"
topic: frontend
grade: junior
category: "API браузера"
order: 111
difficulty: easy
---

## Відповідь

Capturing — подія йде від `document` до target. Bubbling — від target вгору до `document`. За замовчуванням listener спрацьовує на bubbling. Третій аргумент `true` — capturing phase.

## Приклад

```js
parent.addEventListener('click', handler);        // bubbling
parent.addEventListener('click', handler, true);  // capturing
```

## Юз кейси

- Bubbling — event delegation на батьківському списку
- `stopPropagation()` — щоб клік по кнопці не закрив модалку

## Документація

- [Event bubbling — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [Event capturing — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase)
