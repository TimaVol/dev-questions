---
title: "Яку нову фічу в CSS (з тих, що зараз перебувають на стадії розробки або імплементації в деяких браузерах) ви очікуєте найбільше? Чому саме цю?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 33
difficulty: hard
---

## Відповідь

Top picks для senior: **`@starting-style`** — entry animations без JS (disclosure, modal open); **`scroll-driven animations`** — parallax/progress без scroll listeners; **`anchor positioning`** — tooltip/popover без JS positioning libs; **`CSS if()`** (коли stable) — conditional values; **`subgrid`** — nested grids align columns; **`@property`** — animatable custom properties. Найбільший impact — **scroll-driven animations** + **starting-style**: менше JS, краща perf, progressive enhancement. Перевіряти **Baseline status** перед production.

## Приклад

`@starting-style` для modal fade-in:

```css
dialog[open] {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s, transform 0.3s, display 0.3s allow-discrete;
}
@starting-style {
  dialog[open] {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

Scroll-driven progress bar:

```css
.progress {
  animation: grow linear;
  animation-timeline: scroll(root);
}
@keyframes grow { from { width: 0; } to { width: 100%; } }
```

## Юз кейси

- Замінити JS IntersectionObserver animations на CSS scroll timelines
- Tooltip positioning: `anchor-name` / `position-anchor` замість Popper.js
- Feature detect: `@supports (animation-timeline: scroll())` — enhanced UX

## Документація

- [@starting-style — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- [Scroll-driven animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)
