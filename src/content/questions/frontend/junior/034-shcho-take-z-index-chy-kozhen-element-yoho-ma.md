---
title: "Що таке z-index? Чи кожен елемент його має?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 34
difficulty: medium
---

## Відповідь

`z-index` керує порядком накладання в межах stacking context. Працює лише на positioned елементах (`relative`, `absolute`, `fixed`, `sticky`). За замовчуванням `auto` — не всі елементи мають явний z-index.

## Приклад

```css
.dropdown { position: absolute; z-index: 100; }
.modal-overlay { position: fixed; z-index: 1000; }
```

## Юз кейси

- Dropdown поверх контенту сторінки
- Модалка поверх overlay

## Документація

- [z-index — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)
- [position — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
