---
title: "Як ви розробляєте анімації з погляду продуктивності, зокрема при використанні CSS або JavaScript?"
topic: frontend
grade: middle
category: "Performance"
order: 39
difficulty: medium
---

## Відповідь

Анімую лише `transform` і `opacity` (compositor). `will-change` — обережно, лише перед анімацією. JS — `requestAnimationFrame`. Уникати `width`/`height`/`top` анімацій. DevTools Performance для jank.

## Приклад

```css
.panel {
  transform: translateX(100%);
  transition: transform 0.3s ease;
}
.panel_open { transform: translateX(0); }
```

## Юз кейси

- Slide-in drawer без layout thrashing
- `rAF` для scroll-linked анімації
- `prefers-reduced-motion` для a11y

## Документація

- [Animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
