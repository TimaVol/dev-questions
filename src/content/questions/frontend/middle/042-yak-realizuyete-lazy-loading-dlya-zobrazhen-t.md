---
title: "Як реалізуєте lazy loading для зображень та інших ресурсів для оптимізації часу завантаження?"
topic: frontend
grade: middle
category: "Performance"
order: 42
difficulty: medium
---

## Відповідь

`<img loading="lazy">`, `decoding="async"`, Intersection Observer для кастомного lazy loading, dynamic `import()` для JS. Placeholder/skeleton для зменшення CLS.

## Приклад

```html
<img src="thumb.webp" loading="lazy" decoding="async"
     width="300" height="200" alt="Фото товару">
```

## Юз кейси

- Lazy images у каталозі з 500+ товарів
- Dynamic import для важкого редактора
- Blur placeholder (LQIP)

## Документація

- [loading="lazy" — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading)
- [Lazy loading images — web.dev](https://web.dev/articles/browser-level-image-lazy-loading)
