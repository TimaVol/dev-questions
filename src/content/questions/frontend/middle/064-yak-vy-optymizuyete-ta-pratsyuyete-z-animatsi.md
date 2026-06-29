---
title: "Як ви оптимізуєте та працюєте з анімаціями в браузері? Які підходи використовуєте для досягнення високої продуктивності та плавності анімацій?"
topic: frontend
grade: middle
category: "JavaScript"
order: 64
difficulty: medium
---

## Відповідь

Анімую лише `transform` і `opacity` — вони не викликають layout. `will-change` додаю тимчасово перед анімацією, не постійно. JS-анімації — через `requestAnimationFrame`. Обов’язково поважаю `prefers-reduced-motion` і вимикаю декоративні ефекти для таких користувачів.

## Приклад

```css
@media (prefers-reduced-motion: no-preference) {
  .drawer {
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  .drawer--open { transform: translateX(0); }
}
```

## Юз кейси

- Плавний scroll-linked ефект на 60fps
- Доступність: вимкнення анімацій за системним налаштуванням
- GPU-прискорений `translate` замість анімації `left`

## Документація

- [Animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
