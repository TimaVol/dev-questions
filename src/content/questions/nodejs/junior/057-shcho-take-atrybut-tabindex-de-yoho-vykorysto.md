---
title: "Що таке атрибут tabindex? Де його використовують?"
topic: nodejs
grade: junior
category: "HTML + CSS"
order: 57
difficulty: easy
---

## Відповідь

`tabindex` керує порядком фокусу з клавіатури (Tab):

- **`tabindex="0"`** — елемент у природному tab order (корисно для кастомних кнопок на `div`).
- **`tabindex="-1"`** — програмний фокус (`el.focus()`), не в Tab-послідовності.
- **Позитивні значення** — ручний порядок (антипатерн, уникати).

Важливо для доступності модалок і кастомних віджетів.

## Приклад

```html
<button type="button">Звичайна кнопка</button>

<div role="button" tabindex="0" id="custom-btn">Кастомна</div>

<div role="dialog" tabindex="-1" id="modal" hidden>
  <button>Закрити</button>
</div>
```

```js
modal.hidden = false;
modal.focus(); // tabindex="-1" дозволяє focus
```

## Юз кейси

- Фокус у модалці після відкриття (a11y)
- Skip link «перейти до контенту»
- Кастомний dropdown з keyboard navigation

## Документація

- [tabindex — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
