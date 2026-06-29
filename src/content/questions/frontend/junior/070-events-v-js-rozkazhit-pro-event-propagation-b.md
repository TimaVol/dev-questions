---
title: "Events в JS. Розкажіть про event propagation, bubbling, delegation, preventing тощо."
topic: frontend
grade: junior
category: "Основи JavaScript"
order: 70
difficulty: easy
---

## Відповідь

Подія проходить фази: capturing (зверху вниз), target, bubbling (знизу вгору). `stopPropagation()` зупиняє поширення. Delegation — один listener на батьку замість сотень на дочірніх. `preventDefault()` скасовує дію за замовчуванням (submit, посилання).

## Приклад

```js
list.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    e.preventDefault();
    removeItem(e.target.dataset.id);
  }
});
```

## Юз кейси

- Event delegation на динамічному списку todo
- `preventDefault()` на формі для AJAX-відправки

## Документація

- [Event bubbling — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [addEventListener — MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
