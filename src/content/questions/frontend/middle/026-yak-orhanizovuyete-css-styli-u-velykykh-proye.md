---
title: "Як організовуєте CSS-стилі у великих проєктах? Чи використовуєте які-небудь методології?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 26
difficulty: medium
---

## Відповідь

ITCSS/BEM, design tokens, компонентні стилі поруч з UI, один entry SCSS/CSS, Stylelint. Уникаю глобальних overrides і deep nesting.

## Приклад

```
styles/
  tokens.css      # --color, --space
  base.css        # reset, typography
  components/     # Button.css поруч з Button.tsx
```

## Юз кейси

- Design tokens для white-label продукту
- ITCSS у великому legacy SCSS
- Colocation стилів у React
