---
title: "Що таке mobile-first підхід, які його переваги та недоліки?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 57
difficulty: easy
---

## Відповідь

Mobile-first — спочатку стилі для мобілки, потім `@media (min-width: ...)` для більших екранів. Плюс: прогресивне розширення, менше override. Мінус: десктопний дизайн інколи важче «нарощувати» з вузької бази.

## Приклад

```css
.nav { flex-direction: column; }
@media (min-width: 768px) {
  .nav { flex-direction: row; }
}
```

## Юз кейси

- Сайт, де 70%+ трафіку з мобільних
- Спрощений CSS без desktop-first override-ів

## Документація

- [Media queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
