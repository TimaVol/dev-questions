---
title: "У вас є сторінка галереї, на якій потрібно показати велику кількість відео з YouTube. Як би ви це реалізували так, щоб сторінка швидко завантажувалась?"
topic: frontend
grade: middle
category: "Performance"
order: 44
difficulty: hard
---

## Відповідь

Facade pattern: thumbnail + play button, iframe завантажується по кліку. `loading="lazy"` на iframe. Intersection Observer — підвантажувати embed лише у viewport. Використовувати youtube-nocookie.

## Приклад

```html
<div class="video-facade" data-video-id="dQw4w9WgXcQ">
  <img src="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg" alt="Відео">
  <button aria-label="Відтворити">▶</button>
</div>
```

## Юз кейси

- Галерея 50+ YouTube без 50 iframes
- Lite YouTube Embed
- Lazy embed при scroll into view

## Документація

- [iframe — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
- [loading="lazy" — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-loading)
