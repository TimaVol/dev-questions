---
title: "Які є типи списків у HTML? Що таке ul / ol / dl?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 18
difficulty: easy
---

## Відповідь

`ul` — маркований список, `ol` — нумерований, `dl` — список визначень (`dt` — термін, `dd` — опис). Для навігації краще список усередині `<nav>`.

## Приклад

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>
<dl>
  <dt>API</dt>
  <dd>Інтерфейс для обміну даними</dd>
</dl>
```

## Юз кейси

- Меню навігації як `<ul>` у `<nav>`
- Глосарій термінів через `<dl>`

## Документація

- [ul/ol lists — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)
- [ol — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol)
