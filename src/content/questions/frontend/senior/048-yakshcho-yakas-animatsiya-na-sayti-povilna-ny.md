---
title: "Якщо якась анімація на сайті повільна (низький FPS), як дізнатися причину? Які причини бувають?"
topic: frontend
grade: senior
category: "JavaScript"
order: 48
difficulty: medium
---

## Відповідь

Діагностика починається з **Chrome DevTools → Performance**: запис під час анімації, дивимось FPS chart, long tasks (>50ms), Layout/Recalculate Style/Paint events. **Rendering tab** — highlight repaints. Типові причини низького FPS: анімація **layout-triggering** властивостей (`width`, `height`, `top`, `margin`) замість `transform`/`opacity`; **layout thrashing** (read/write DOM у циклі); важкі **box-shadow/filter/blur** на великих елементах; занадто багато DOM nodes; **main thread blocked** JS; відсутність `prefers-reduced-motion`. Composite-only анімації (`transform`, `opacity`) йдуть на GPU compositor thread — 60fps навіть при завантаженому main thread.

## Приклад

```js
// ❌ 15fps — margin-top кожен frame = layout
function badAnimate(el) {
  let y = 0;
  function tick() {
    y += 2;
    el.style.marginTop = y + 'px'; // triggers reflow
    if (y < 200) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ✅ 60fps — transform = composite only
function goodAnimate(el) {
  let y = 0;
  function tick() {
    y += 2;
    el.style.transform = `translateY(${y}px)`;
    if (y < 200) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
```

Performance panel: шукайте червоні смуги «Layout» під час анімації.

## Юз кейси

- Parallax на scroll: замінити scroll listener + `top` на CSS `scroll-driven animations`
- Modal fade: `opacity` + `transform`, не `height` transition
- Mobile jank: 300 DOM nodes з `filter: blur()` — спростити або `will-change: transform` обережно

## Документація

- [CSS animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
- [Analyze runtime performance — Chrome DevTools](https://developer.chrome.com/docs/devtools/performance)
