---
title: "Що зазвичай найбільше знижує показники швидкодії сайту?"
topic: frontend
grade: junior
category: "Web Performance"
order: 52
difficulty: easy
---

## Відповідь

Найчастіше: великі неоптимізовані зображення, забагато JS без code splitting, render-blocking CSS/JS у `<head>`, відсутність кешування, повільний TTFB сервера.

## Приклад

```html
<img src="hero.webp" width="1200" height="600" loading="lazy" alt="Hero">
<script src="app.js" defer></script>
```

## Юз кейси

- Конвертація PNG у WebP/AVIF для hero-зображень
- `defer` на скриптах, щоб не блокувати парсинг HTML

## Документація

- [Code splitting — web.dev](https://web.dev/learn/performance/code-split-javascript)
- [Image formats — MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)
