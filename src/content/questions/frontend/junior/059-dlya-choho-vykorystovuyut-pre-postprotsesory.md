---
title: "Для чого використовують пре-/постпроцесори?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 59
difficulty: medium
---

## Відповідь

Препроцесори (Sass, Less) — пишуть розширений синтаксис, компілюють у CSS. Постпроцесори (PostCSS, Autoprefixer) — обробляють готовий CSS: вендорні префікси, мініфікація, future syntax.

## Приклад

```css
/* Після Autoprefixer */
.flex { display: flex; display: -webkit-flex; }
```

## Юз кейси

- Autoprefixer для `-webkit-` у старих Safari
- cssnano для мініфікації CSS у production build

## Документація

- [Sass — Documentation](https://sass-lang.com/documentation/)
