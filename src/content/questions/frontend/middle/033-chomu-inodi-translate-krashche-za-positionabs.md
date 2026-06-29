---
title: "Чому іноді translate краще за position:absolute під час написання стилів?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 33
difficulty: medium
---

## Відповідь

`transform: translate()` не викликає layout reflow — анімується на compositor layer. `position: absolute` змінює layout context і може спричинити repaint сусідніх елементів. Для центрування та анімацій translate ефективніший.

## Приклад

```css
.tooltip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.2s, opacity 0.2s;
}
```

## Юз кейси

- Tooltip/popover без layout shift
- Slide-in анімація sidebar
- Parallax через `translate3d` на GPU

## Документація

- [transform — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [position — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
