---
title: "Як семантична верстка впливає на доступність сторінки?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 29
difficulty: medium
---

## Відповідь

Семантичні теги (`header`, `nav`, `main`, `article`) дають outline для скрінрідерів, landmarks для навігації, кращий SEO. `<div>` на все — гірша a11y без ARIA-костилів.

## Приклад

```html
<header><nav aria-label="Головне"><ul>...</ul></nav></header>
<main>
  <article><h1>Заголовок статті</h1><p>Текст</p></article>
</main>
```

## Юз кейси

- Landing з правильним heading hierarchy
- Screen reader skip-to-content
- SEO outline для блогу

## Документація

- [Semantics — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [Accessibility tree — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree)
