---
title: "Як із врахуванням HTML і CSS забезпечити доступність сайту?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 48
difficulty: medium
---

## Відповідь

Семантичний HTML, `alt` на зображеннях, `<label for>` на формах, контраст кольорів (WCAG 4.5:1), фокус-стилі для клавіатури, `aria-*` лише коли нативний HTML не вистачає.

## Приклад

```html
<button aria-expanded="false" aria-controls="menu">Меню</button>
<ul id="menu" hidden>...</ul>
```

```css
:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
```

## Юз кейси

- Форма з пов'язаними label і input
- Видимий focus ring для навігації табом

## Документація

- [Accessibility — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility)
- [ARIA — MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
