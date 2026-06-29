---
title: "Що таке DOCTYPE і навіщо його використовують?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 7
difficulty: easy
---

## Відповідь

`<!DOCTYPE html>` — перший рядок документа, який каже браузеру рендерити сторінку в standards mode, а не в quirks mode зі старими багами верстки.

## Приклад

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Мій додаток</title>
</head>
<body></body>
</html>
```

## Юз кейси

- Базовий HTML5 boilerplate для кожної нової сторінки
- Виправлення непередбачуваної верстки на legacy-сторінках без DOCTYPE

## Документація

- [DOCTYPE — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Doctype)
