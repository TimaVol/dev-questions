---
title: "Які одиниці розмірів є в CSS?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 42
difficulty: medium
---

## Відповідь

Абсолютні: `px`. Відносні: `%`, `em`, `rem`, `vw`/`vh`, `ch`. Сучасні: `clamp()`, container query units (`cqw`). `rem` — від розміру шрифту root, зручно для типографіки.

## Приклад

```css
.title { font-size: 2rem; }
.container { width: min(100%, 1200px); padding: 1rem; }
.hero { height: 50vh; }
```

## Юз кейси

- `rem` для масштабованої типографіки
- `clamp()` для fluid-розміру заголовка

## Документація

- [CSS lengths — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
