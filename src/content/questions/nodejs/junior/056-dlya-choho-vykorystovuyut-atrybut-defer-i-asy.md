---
title: "Для чого використовують атрибут defer і async у тегу script?"
topic: nodejs
grade: junior
category: "HTML + CSS"
order: 56
difficulty: easy
---

## Відповідь

**`async`** — скрипт завантажується паралельно з HTML і виконується одразу після завантаження (порядок між кількома async не гарантований). **`defer`** — завантаження паралельне, виконання після повного parse DOM, у порядку оголошення. Без обох — блокуючий скрипт. `type="module"` за замовчуванням defer-подібний.

## Приклад

```html
<script async src="analytics.js"></script>
<script defer src="app.js"></script>
<script defer src="app-init.js"></script>
<!-- app.js виконається перед app-init.js -->
```

## Юз кейси

- `defer` для головного bundle застосунку
- `async` для незалежної аналітики/реклами
- Статика з Express: правильні теги в `layout.ejs`

## Документація

- [script — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
