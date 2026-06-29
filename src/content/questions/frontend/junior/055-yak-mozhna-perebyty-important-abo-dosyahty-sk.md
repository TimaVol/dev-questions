---
title: "Як можна перебити important або досягти схожого ефекту без important?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 55
difficulty: easy
---

## Відповідь

Підвищити специфічність селектора (`.btn.btn--primary`), використати той самий селектор пізніше в каскаді, або CSS-змінні. `!important` — крайній засіб; краще виправити архітектуру стилів.

## Приклад

```css
/* Замість !important — вища специфічність */
.sidebar .nav .link { color: blue; }
```

## Юз кейси

- Перевизначення стилів сторонньої бібліотеки без форку
- Уникнення `!important` у design system

## Документація

- [Specificity vs !important — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
