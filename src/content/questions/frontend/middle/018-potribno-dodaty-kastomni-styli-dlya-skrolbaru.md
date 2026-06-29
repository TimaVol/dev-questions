---
title: "Потрібно додати кастомні стилі для скролбару. Як би ви це зробили?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 18
difficulty: easy
---

## Відповідь

WebKit: `::-webkit-scrollbar`. Стандарт: `scrollbar-width`, `scrollbar-color`. Не ховати повністю — порушує a11y (користувач не бачить, що контент скролиться).

## Приклад

```css
.sidebar {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #94a3b8 transparent;
}
.sidebar::-webkit-scrollbar { width: 6px; }
.sidebar::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 3px; }
```

## Юз кейси

- Кастомний скрол у sidebar з довгим меню
- Тонкий scrollbar у code editor panel
- Збереження видимості thumb для a11y

## Документація

- [::-webkit-scrollbar — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)
- [scrollbar-width — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width)
