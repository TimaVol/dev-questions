---
title: "Розкажіть про ваше бачення сучасного адаптивного вебдизайну: які існують альтернативи для media queries. Обґрунтуйте вибір одиниць виміру для брейкпоінтів та їх значення."
topic: frontend
grade: senior
category: "HTML/CSS"
order: 21
difficulty: hard
---

## Відповідь

Сучасний responsive — не «3 фіксовані breakpoints», а **content-driven** адаптація. Альтернативи media queries: **Container Queries** (`@container`) — компонент адаптується до ширини батька, не viewport; **Fluid spacing/type** через `clamp()`; **Flexbox/Grid auto-fit** (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`). Breakpoints у **em/rem** (не px) — поважають user font-size zoom. Типові точки: 48em (~768px), 64em (~1024px) — але senior спочатку дивиться, де **ломається layout**, а не копіює Bootstrap.

## Приклад

Container query для card grid:

```css
.card-grid { container-type: inline-size; }
.card-grid__inner {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr; /* default: stack */
}
@container (min-width: 32rem) {
  .card-grid__inner { grid-template-columns: repeat(2, 1fr); }
}
@container (min-width: 48rem) {
  .card-grid__inner { grid-template-columns: repeat(3, 1fr); }
}
```

Sidebar 240px + fluid main — без viewport breakpoint:

```css
.layout {
  display: grid;
  grid-template-columns: minmax(200px, 240px) 1fr;
}
```

## Юз кейси

- Dashboard widget у sidebar vs full page: container query, не `@media (max-width: 768px)`
- Email-like narrow panel: card сам стає horizontal при `@container (min-width: 400px)`
- Design review: «чому breakpoint 768px?» — показати screenshot де layout breaks

## Документація

- [CSS container queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- [Container queries — web.dev](https://web.dev/articles/container-queries)
