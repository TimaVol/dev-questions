---
title: "Як ви вирішуєте проблеми з кросбраузерною сумісністю в розробці вебсайтів, зокрема в контексті різних версій браузерів?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 47
difficulty: easy
---

## Відповідь

Перевіряю Baseline/Can I Use перед використанням фічі, додаю fallbacks і autoprefixer, тестую в Chrome/Firefox/Safari. Для старих браузерів — progressive enhancement: базовий функціонал працює всюди, покращення — де підтримується.

## Приклад

```css
.card {
  display: grid;
  gap: 1rem;
}
@supports (gap: 1rem) {
  .card { gap: 1rem; }
}
```

## Юз кейси

- `@supports` для graceful degradation нових CSS-фіч
- Browserslist у проєкті для визначення цільових браузерів

## Документація

- [Can I use](https://caniuse.com/)
