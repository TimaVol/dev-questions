---
title: "Що таке адаптивна типографіка? Які техніки ви знаєте та використовуєте на своїх проєктах?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 20
difficulty: medium
---

## Відповідь

Адаптивна типографіка — коли розмір, інтерліньяж і довжина рядка комфортні на будь-якому viewport, без ручних breakpoint-only стрибків. Техніки: **`clamp(min, preferred, max)`** для fluid font-size; **`rem`** base (зазвичай 16px) для масштабування з user settings; **type scale** (1.25, 1.333) через CSS variables; **`line-height`** без одиниць (1.5–1.7) або `calc(1em + 0.5rem)`; **`max-width: 65ch`** для body text; **`font-size-adjust`** для fallback fonts; container queries для компонентного масштабу. Уникаю фіксованих `px` для body — accessibility і zoom.

## Приклад

```css
:root {
  --font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --font-size-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem);
  --line-height-body: 1.6;
  --measure: 65ch;
}

body {
  font-size: var(--font-size-base);
  line-height: var(--line-height-body);
}

.prose {
  max-width: var(--measure);
}

h1 { font-size: var(--font-size-lg); line-height: 1.2; }
```

## Юз кейси

- Marketing landing: fluid headings без 5 media queries
- Dashboard: denser type на desktop через `clamp`, readable на mobile
- i18n: `ch` unit + `overflow-wrap` для довгих німецьких слів

## Документація

- [clamp() — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [Fluid typography — web.dev](https://web.dev/articles/fluid-typography)
