---
title: "Опишіть особливості імплементації навігації по сайту з клавіатури."
topic: frontend
grade: middle
category: "Accessibility"
order: 100
difficulty: hard
---

## Відповідь

Усі інтерактивні елементи доступні з Tab у логічному порядку. `:focus-visible` — видимий індикатор фокусу, не `outline: none` без заміни. Skip link «Перейти до контенту» на початку. У меню — roving tabindex. У модалці — focus trap і повернення фокусу після закриття.

## Приклад

```html
<a href="#main" class="skip-link">Перейти до контенту</a>
<nav aria-label="Головна навігація">
  <a href="/">Головна</a>
  <a href="/catalog">Каталог</a>
</nav>
<main id="main" tabindex="-1">...</main>
```

## Юз кейси

- Skip link для скрінрідерів і power users
- Focus trap у dialog — Tab не виходить за межі модалки
- Roving tabindex у горизонтальному меню зі стрілками

## Документація

- [Keyboard-navigable JavaScript widgets — MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Keyboard-navigable_JavaScript_widgets)
- [tabindex — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
