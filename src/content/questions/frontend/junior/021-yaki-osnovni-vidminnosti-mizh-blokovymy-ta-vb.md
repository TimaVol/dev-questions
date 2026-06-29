---
title: "Які основні відмінності між блоковими та вбудованими елементами в HTML? Як вони впливають на структуру сторінки?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 21
difficulty: easy
---

## Відповідь

Блокові (`div`, `p`, `section`) займають всю ширину рядка і починають з нового рядка. Inline (`span`, `a`, `strong`) — лише ширину контенту, не ламають потік тексту.

## Приклад

```html
<div>Блок 1</div>
<div>Блок 2 — на новому рядку</div>
<p>Текст з <span>inline-фрагментом</span> в одному рядку.</p>
```

## Юз кейси

- `<div>` для картки або секції сторінки
- `<span>` для підсвітки слова всередині абзацу

## Документація

- [Block elements — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)
