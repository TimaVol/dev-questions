---
title: "Вам потрібно зробити галерею картинок, які мають плавно гортатись при скролі вбік усередині галереї. Як би ви це реалізували? Чи можливо це зробити без JS?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 35
difficulty: hard
---

## Відповідь

Так, **без JS** — `overflow-x: auto` + **`scroll-snap-type: x mandatory`** + `scroll-snap-align: center` на slides. Smooth scroll: `scroll-behavior: smooth` (respect `prefers-reduced-motion`). Для drag-on-desktop — native scroll достатньо; pagination dots — optional JS для a11y (`aria-selected`). Advanced: **`scroll-timeline`** для progress indicator без scroll listeners. Avoid horizontal scroll on whole page — `overscroll-behavior-x: contain`. Images: `loading="lazy"`, fixed aspect-ratio (`aspect-ratio: 16/9`) проти CLS.

## Приклад

```html
<div class="gallery" role="region" aria-label="Галерея товарів">
  <ul class="gallery__track">
    <li class="gallery__slide"><img src="1.webp" alt="Фото 1" loading="lazy" /></li>
    <li class="gallery__slide"><img src="2.webp" alt="Фото 2" loading="lazy" /></li>
    <li class="gallery__slide"><img src="3.webp" alt="Фото 3" loading="lazy" /></li>
  </ul>
</div>
```

```css
.gallery__track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}
.gallery__slide {
  flex: 0 0 85%;
  scroll-snap-align: center;
}
.gallery__slide img { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px; }
@media (prefers-reduced-motion: reduce) {
  .gallery__track { scroll-behavior: auto; }
}
```

## Юз кейси

- Product carousel mobile: CSS-only snap, arrows опційно для desktop a11y
- Thumbnail strip + main image: JS для sync, strip сам CSS scroll-snap
- Performance: без scroll event listeners — compositor-thread scroll

## Документація

- [CSS scroll snap — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap)
- [Image formats — MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)
