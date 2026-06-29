---
title: "Які основні теги структури HTML-сторінки?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 8
difficulty: easy
---

## Відповідь

Скелет сторінки: `<!DOCTYPE html>`, `<html>`, `<head>` (meta, title, link) і `<body>`. У body — семантичні блоки: `<header>`, `<nav>`, `<main>`, `<footer>`.

## Приклад

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Сторінка</title>
</head>
<body>
  <header><nav>...</nav></header>
  <main><h1>Контент</h1></main>
  <footer>© 2026</footer>
</body>
</html>
```

## Юз кейси

- Створення нової сторінки з правильною структурою
- SEO та accessibility — пошуковики й скрінрідери розуміють ієрархію

## Документація

- [HTML elements — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
- [meta — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
