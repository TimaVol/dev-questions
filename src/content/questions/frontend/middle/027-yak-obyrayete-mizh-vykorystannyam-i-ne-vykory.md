---
title: "Як обираєте між використанням і не використанням препроцесорів CSS, таких як Sass чи Less, у своїх проєктах? Які переваги ви бачите у цьому?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 27
difficulty: medium
---

## Відповідь

Sass — nesting, mixins, functions, зручний для великих legacy. Сучасний CSS (vars, nesting) + PostCSS (autoprefixer) часто достатньо. Sass — якщо команда вже на ньому; інакше — native CSS + PostCSS.

## Приклад

```scss
@mixin focus-ring {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
.button:focus-visible { @include focus-ring; }
```

## Юз кейси

- PostCSS autoprefixer для всіх проєктів
- Sass mixins у legacy monolith
- Міграція SCSS vars → CSS custom properties

## Документація

- [Sass — Documentation](https://sass-lang.com/documentation/)
