---
title: "Чому розробники рекомендують записувати під’єднання перед закриттям body? Що буде, якщо прописати JS-код в head?"
topic: nodejs
grade: junior
category: "HTML + CSS"
order: 55
difficulty: easy
---

## Відповідь

Скрипт без `defer`/`async` у `<head>` **блокує парсинг HTML** — браузер чекає завантаження і виконання JS перед рендером body. Скрипти перед `</body>` виконуються після розбору DOM, сторінка швидше показується. Сучасна альтернатива: `<script defer src="app.js">` у head — завантаження паралельно, виконання після parse.

## Приклад

```html
<head>
  <script defer src="/bundle.js"></script>
</head>
<body>
  <div id="app"></div>
  <!-- або класично: -->
  <script src="/legacy.js"></script>
</body>
```

## Юз кейси

- SSR-шаблони Express з client bundle в кінці
- `defer` для ES modules у сучасних SPA
- Уникати `document.getElementById` до існування елемента

## Документація

- [script — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
