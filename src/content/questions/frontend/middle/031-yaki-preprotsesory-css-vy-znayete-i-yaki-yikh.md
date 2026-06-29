---
title: "Які препроцесори CSS ви знаєте і які їхні переваги?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 31
difficulty: easy
---

## Відповідь

Sass/Less — вкладеність, mixins, змінні (на етапі компіляції). PostCSS — autoprefixer, postcss-preset-env для сучасного CSS. У production лишається звичайний CSS.

## Приклад

```scss
$brand: #2563eb;
.nav-link {
  color: $brand;
  &:hover { text-decoration: underline; }
}
```

## Юз кейси

- Autoprefixer для `-webkit-` у production
- Sass у legacy-коді, PostCSS у нових модулях
- `postcss-preset-env` для вкладеності (nesting)

## Документація

- [Sass — Documentation](https://sass-lang.com/documentation/)
