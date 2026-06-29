---
title: "На умовному сайті є кастомний декоративний шрифт, який негативно впливає на продуктивність. Назвіть усі можливі варіанти його оптимізації."
topic: frontend
grade: senior
category: "Performance"
order: 36
difficulty: hard
---

## Відповідь

Font perf checklist: (1) **`font-display: swap`** або optional — уникнути invisible text; (2) **subset** — лише потрібні glyphs (Latin, Cyrillic); (3) **woff2** only — найкраще стиснення; (4) **preload** critical weights; (5) **self-host** замість Google Fonts chain; (6) **variable font** — один file замість 4 weights; (7) **limit weights/styles** — regular + bold достатньо; (8) **`size-adjust`** / fallback metrics — зменшити CLS; (9) decorative font ** лише на hero** via `@font-face` scope; (10) **system font stack** fallback з matched metrics.

## Приклад

```css
@font-face {
  font-family: 'Display';
  src: url('/fonts/display-subset.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
  unicode-range: U+0400-04FF, U+0000-00FF; /* Cyrillic + Latin */
}

.hero-title {
  font-family: 'Display', 'Segoe UI', system-ui, sans-serif;
  size-adjust: 105%; /* reduce CLS vs fallback */
}
```

```html
<link rel="preload" href="/fonts/display-subset.woff2" as="font" type="font/woff2" crossorigin>
```

Build-time subsetting:

```bash
# pyftsubset or glyphhanger
npx glyphhanger --subset=*.woff2 --formats=woff2 --css
```

## Юз кейси

- LCP text delay 2s: swap + subset → FCP −800ms
- Decorative font лише на H1: прибрати з body, save 180KB
- Third-party font CDN blocked: self-host, preload, CSP `font-src 'self'`

## Документація

- [@font-face — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
- [font-display — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
