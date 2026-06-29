---
title: "Як використовують атрибути class та id? Яка різниця між класами та ідентифікаторами?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 14
difficulty: medium
---

## Відповідь

`class` — повторювані стилі, можна кілька через пробіл. `id` — унікальний на сторінці, для якорів (`#section`) і `label for`. Не дублюй id.

## Приклад

```html
<label for="email">Email</label>
<input id="email" class="input input--large" type="email">
<a href="#pricing">До цін</a>
<section id="pricing">...</section>
```

## Юз кейси

- Кілька кнопок з класом `.btn`, одна з модифікатором `.btn--primary`
- Якірне посилання до секції на landing page

## Документація

- [class — MDN](https://developer.mozilla.org/uk/docs/Web/HTML/Global_attributes/class)
- [id — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)
