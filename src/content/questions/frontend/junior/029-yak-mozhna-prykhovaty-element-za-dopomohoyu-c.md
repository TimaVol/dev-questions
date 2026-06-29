---
title: "Як можна приховати елемент за допомогою CSS? Чи однаково будуть працювати opacity: 0; display: none; visibility:hidden?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 29
difficulty: easy
---

## Відповідь

`display: none` — елемент зникає з layout, не клікабельний. `visibility: hidden` — місце залишається, не клікабельний. `opacity: 0` — місце є, елемент ще ловить кліки.

## Приклад

```css
.modal--hidden { display: none; }
.tooltip--hidden { visibility: hidden; }
.fade-out { opacity: 0; transition: opacity 0.3s; }
```

## Юз кейси

- `display: none` — повністю приховати модалку
- `opacity: 0` — плавне зникнення з transition

## Документація

- [display — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [visibility — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
