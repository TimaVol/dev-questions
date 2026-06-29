---
title: "Що таке DOM Reflow, Repaint, Composite? Як це працює?"
topic: frontend
grade: senior
category: "Performance"
order: 40
difficulty: medium
---

## Відповідь

Pipeline рендерингу браузера: **Style** → **Layout (reflow)** → **Paint (repaint)** → **Composite**. **Reflow** — перерахунок geometry (width, height, position) — дорогий, cascade на descendants. **Repaint** — pixels без layout (color, visibility) — дешевший. **Composite** — GPU layers, лише transform/opacity — найдешевший, без layout/paint. Triggers reflow: `offsetWidth`, `getBoundingClientRect()`, зміна width/font/dom insert. Оптимізація: batch DOM reads/writes, `transform`/`opacity` для анімацій, `will-change` обережно, уникати layout thrashing.

## Приклад

```js
// ❌ layout thrashing — interleaved read/write
elements.forEach(el => {
  el.style.width = el.offsetWidth + 10 + 'px'; // read then write × N
});

// ✅ batch reads, then writes
const widths = elements.map(el => el.offsetWidth);
elements.forEach((el, i) => { el.style.width = widths[i] + 10 + 'px'; });
```

```css
/* ✅ composite-only animation */
.card { transition: transform 0.3s, opacity 0.3s; }
.card:hover { transform: translateY(-4px); opacity: 0.95; }

/* ❌ triggers layout every frame */
.card:hover { margin-top: -4px; }
```

DevTools → Performance → Layout / Recalculate Style events.

## Юз кейси

- Анімація sidebar: `transform: translateX()`, не `width`
- Infinite scroll: DocumentFragment batch insert — один reflow
- React list: virtualize 10k rows — уникати 10k layout passes

## Документація

- [How browsers work — MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work)
- [Reflow — MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Reflow)
