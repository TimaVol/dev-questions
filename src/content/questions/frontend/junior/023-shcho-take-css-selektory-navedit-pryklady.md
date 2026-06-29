---
title: "Що таке CSS-селектори? Наведіть приклади."
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 23
difficulty: easy
---

## Відповідь

Селектори обирають елементи для стилізації: за тегом (`p`), класом (`.btn`), id (`#header`), атрибутом (`[type="email"]`), нащадком (`ul li`), псевдокласом (`:hover`).

## Приклад

```css
.btn { padding: 0.5rem 1rem; }
.btn--primary { background: blue; }
input[type="email"]:focus { outline: 2px solid blue; }
li:last-child { color: red; }
```

## Юз кейси

- Стилізація стану кнопки при наведенні (`:hover`)
- Вибір останнього елемента списку через `:last-child`

## Документація

- [Selectors — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)
