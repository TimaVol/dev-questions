---
title: "Що таке семантичні теги та навіщо вони потрібні? Наведіть приклади таких тегів."
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 9
difficulty: easy
---

## Відповідь

Семантичні теги описують зміст, а не лише вигляд: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`. Краще за `<div>` для SEO, accessibility і читабельності коду.

## Приклад

```html
<header><nav aria-label="Головне меню">...</nav></header>
<main>
  <article>
    <h1>Заголовок статті</h1>
    <p>Текст...</p>
  </article>
</main>
```

## Юз кейси

- Landing page з чіткою структурою для пошуковиків
- Навігація скрінрідером по landmarks (main, nav)

## Документація

- [HTML elements — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
