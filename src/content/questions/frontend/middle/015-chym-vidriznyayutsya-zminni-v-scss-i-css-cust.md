---
title: "Чим відрізняються змінні в SCSS і CSS Custom Properties? У чому перевага тих чи інших?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 15
difficulty: medium
---

## Відповідь

SCSS-змінні — compile-time, не змінюються в runtime. CSS custom properties (`--color`) — успадковуються, змінюються в JS і media queries. SCSS — mixins/nesting; CSS vars — теми без перекомпіляції.

## Приклад

```css
:root { --brand: #2563eb; }
[data-theme="dark"] { --brand: #60a5fa; }
.button { background: var(--brand); }
```

## Юз кейси

- Темна тема через `data-theme` без Sass rebuild
- Design tokens як CSS variables
- SCSS mixins для складних патернів, vars для runtime

## Документація

- [CSS variables — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Sass — Documentation](https://sass-lang.com/documentation/)
