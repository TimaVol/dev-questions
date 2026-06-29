---
title: "Які є альтернативи для overflow: hidden?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 25
difficulty: medium
---

## Відповідь

`overflow: hidden` часто використовують як hack: clear floats, clip border-radius children, hide scrollbars, «fix» collapsing margins. Проблеми: **обрізає focus outline**, ламає **sticky positioning**, блокує **scroll chaining**, приховує контент від screen readers. Альтернативи: **`display: flow-root`** — BFC без clip; **`border-radius` + `isolation: isolate`**; **`clip-path`** для shaped clip; **`overflow: clip`** (новий, без scroll container); **`contain: layout`** для perf isolation; для scroll — **`overflow: auto`** замість hidden. Senior питає «навіщо hidden?» на кожному review.

## Приклад

```css
/* ❌ hack для float/clearfix */
.wrapper { overflow: hidden; }

/* ✅ modern BFC */
.wrapper { display: flow-root; }

/* ❌ hidden для rounded corners — обрізає focus ring дітей */
.card { overflow: hidden; border-radius: 12px; }

/* ✅ clip на pseudo або img, не на interactive container */
.card__media { border-radius: 12px; overflow: hidden; }
.card__media img { display: block; width: 100%; }
.card__body { padding: 1rem; } /* focus ring visible тут */
```

## Юз кейси

- Modal backdrop: `overflow: hidden` на body — OK, але restore scroll position on close
- Sticky header inside panel: перевірити — hidden ancestor ламає `position: sticky`
- Image gallery: `overflow-x: auto` + scroll-snap замість hidden horizontal scroll

## Документація

- [overflow — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
- [display: flow-root — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display#flow-root)
