---
title: "Навіщо потрібні CSS Logical Properties? Чи використовуєте їх?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 20
difficulty: medium
---

## Відповідь

Logical properties (`margin-inline`, `padding-block`, `inset-inline-start`) поважають writing-mode і RTL. Замінюють left/right/top/bottom для i18n без окремих RTL-стилів.

## Приклад

```css
.card {
  margin-inline: auto;
  padding-block: 1rem;
  padding-inline: 1.5rem;
  border-inline-start: 3px solid var(--brand);
}
```

## Юз кейси

- RTL-локалізація арабською без дублювання CSS
- Вертикальний writing-mode для японського UI
- Єдиний layout для LTR і RTL

## Документація

- [Logical properties — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
