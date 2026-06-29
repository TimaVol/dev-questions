---
title: "Чи можна через HTML + CSS зробити фіксацію кліку? Наведіть приклад."
topic: nodejs
grade: junior
category: "HTML + CSS"
order: 52
difficulty: easy
---

## Відповідь

Повноцінний toggle-стан без JS обмежений, але можливий **checkbox hack** або `:target`. Прихований `input type="checkbox"` + `label`; стилі через `input:checked ~ .panel { display: block }`. Також `:active` (поки тримають кнопку) і `:focus` для фокусу. Для складної логіки потрібен JS.

## Приклад

```html
<input type="checkbox" id="menu-toggle" class="sr-only" />
<label for="menu-toggle">Меню</label>
<nav class="dropdown">...</nav>
```

```css
.dropdown { display: none; }
#menu-toggle:checked ~ .dropdown { display: block; }

button:active { transform: scale(0.98); }
```

## Юз кейси

- Просте мобільне меню без JS (прототип)
- CSS-only accordion для статичних сторінок
- У Node-проєкті — шаблони EJS/Pug з тим самим патерном

## Документація

- [:target — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:target)
