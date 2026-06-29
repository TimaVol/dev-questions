---
title: "Які переваги і недоліки використання CSS-препроцесорів?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 35
difficulty: medium
---

## Відповідь

Плюси: вкладеність, змінні, mixins, менше дублювання. Мінуси: ще один крок збірки, складніший дебаг, сучасний CSS (змінні, nesting) частково замінює потребу в них.

## Приклад

```scss
$primary: #3b82f6;
.btn {
  background: $primary;
  &:hover { background: darken($primary, 10%); }
}
```

## Юз кейси

- Великий legacy-проєкт на Sass з існуючими mixins
- Новий проєкт — часто достатньо PostCSS або нативного CSS nesting

## Документація

- [Sass — Documentation](https://sass-lang.com/documentation/)
