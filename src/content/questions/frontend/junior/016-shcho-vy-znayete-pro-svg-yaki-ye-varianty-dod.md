---
title: "Що ви знаєте про SVG? Які є варіанти додавання SVG на сторінки сайту? Чим вони відрізняються?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 16
difficulty: easy
---

## Відповідь

SVG — векторна графіка, масштабується без втрати якості. Способи: inline у HTML (стилізація через CSS), `<img src="icon.svg">` (простіше, але без зміни кольору), background-image, або `<object>`.

## Приклад

```html
<!-- Inline — можна міняти fill через CSS -->
<svg width="24" height="24" class="icon">
  <circle cx="12" cy="12" r="10" fill="currentColor"/>
</svg>
```

## Юз кейси

- Іконки в UI, що змінюють колір через `currentColor`
- Логотип або ілюстрація на retina-дисплеях без окремого @2x

## Документація

- [SVG element — MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg)
- [Image formats — MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)
