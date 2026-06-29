---
title: "Які є кейси використання @media в CSS, окрім responsive design?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 27
difficulty: medium
---

## Відповідь

@media — не лише width breakpoints. Важливі queries: **`prefers-reduced-motion`** — вимкнути анімації; **`prefers-color-scheme`** — dark/light; **`prefers-contrast`** — high contrast mode; **`hover: hover` / `pointer: fine`** — не hover-only UX на touch; **`print`** — print stylesheet; **`orientation`** — landscape layouts; **`forced-colors`** — Windows High Contrast; **`(min-resolution: 2dppx)`** — retina assets. Senior будує **progressive enhancement**: base styles працюють без media, media — enhancement.

## Приклад

```css
/* Motion safety */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Touch: no hover-dependent UI */
@media (hover: none) and (pointer: coarse) {
  .tooltip { display: none; } /* show info inline instead */
  .dropdown__trigger[aria-expanded="true"] + .dropdown__menu { display: block; }
}

/* Print: hide nav, expand links */
@media print {
  .sidebar, .nav { display: none; }
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.8em; }
}
```

## Юз кейси

- Carousel: autoplay вимкнено при `prefers-reduced-motion: reduce`
- Tooltip на icon-only button: `@media (hover: hover)` — tooltip на hover; інакше завжди видимий label
- Dark mode: `prefers-color-scheme` як default, manual toggle через `[data-theme]`

## Документація

- [Using media queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [prefers-reduced-motion — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
