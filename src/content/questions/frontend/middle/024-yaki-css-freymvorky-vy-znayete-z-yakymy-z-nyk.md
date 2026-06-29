---
title: "Які CSS-фреймворки ви знаєте? З якими з них працювали на проєктах? Які плюси та мінуси вони мали?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 24
difficulty: medium
---

## Відповідь

Tailwind — utility-first, швидкий прототип, великий bundle без purge. Bootstrap — готові компоненти, важко кастомізувати. Bulma — легший. Вибір залежить від команди, design system і legacy.

## Приклад

```html
<!-- Tailwind -->
<button class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
  Купити
</button>
```

## Юз кейси

- Tailwind + design tokens у новому проєкті
- Bootstrap для MVP з дедлайном
- Міграція з Bootstrap на власний DS

## Документація

- [Bootstrap — Docs](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Tailwind CSS — Docs](https://tailwindcss.com/docs)
