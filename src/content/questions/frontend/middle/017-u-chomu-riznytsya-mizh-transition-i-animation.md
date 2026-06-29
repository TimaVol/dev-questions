---
title: "У чому різниця між transition і animation? В яких випадках що використовуєте?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 17
difficulty: medium
---

## Відповідь

`transition` — плавна зміна між двома станами (hover, open). `animation` — складні keyframes, loop, delay. Анімую `transform` і `opacity`, не `width`/`top` — менше layout thrashing.

## Приклад

```css
.modal { opacity: 0; transform: scale(0.95); transition: opacity 0.2s, transform 0.2s; }
.modal_open { opacity: 1; transform: scale(1); }

@keyframes spin { to { transform: rotate(360deg); } }
.loader { animation: spin 0.8s linear infinite; }
```

## Юз кейси

- Hover-ефекти через transition
- Skeleton loader через animation
- Accordion з `@keyframes` для height (обережно з perf)

## Документація

- [CSS transitions — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions)
- [CSS animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
