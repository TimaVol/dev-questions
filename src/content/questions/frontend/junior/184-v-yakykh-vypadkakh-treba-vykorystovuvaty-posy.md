---
title: "В яких випадках треба використовувати посилання, а в яких — кнопку?"
topic: frontend
grade: junior
category: "Accessibility"
order: 184
difficulty: medium
---

## Відповідь

`<a href>` — навігація: інша сторінка, якір, завантаження. `<button>` — дія на поточній сторінці: submit, toggle, відкрити модалку. Не роби `<div onClick>` — погана accessibility.

## Приклад

```html
<a href="/about">Про нас</a>
<button type="button" onclick="openModal()">Відкрити налаштування</button>
```

## Юз кейси

- Посилання — перехід на сторінку товару
- Кнопка — «Додати в кошик» без зміни URL

## Документація

- [a — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
- [button — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
