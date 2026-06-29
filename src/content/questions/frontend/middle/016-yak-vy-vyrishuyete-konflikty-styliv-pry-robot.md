---
title: "Як ви вирішуєте конфлікти стилів при роботі з декількома фронтендерами на проєкті чи запобігаєте цьому?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 16
difficulty: medium
---

## Відповідь

Naming convention (BEM/CSS Modules), design tokens, Stylelint у CI, code review. CSS Modules або scoped styles ізолюють. Уникаю глобальних `!important` і «god selectors».

## Приклад

```css
/* CSS Modules */
.button { padding: 0.5rem 1rem; }
.button_primary { background: var(--brand); }
```

## Юз кейси

- Stylelint `no-duplicate-selectors` у monorepo
- Design tokens замість magic numbers
- CSS Modules у мікрофронтендах
