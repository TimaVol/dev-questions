---
title: "Яка різниця між картинками, доданими через HTML-тег <img>, і CSS-властивістю background-image?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 46
difficulty: medium
---

## Відповідь

`<img>` — контент: має `alt` для accessibility, індексується, масштабується нативно. `background-image` — декорація: без alt, для патернів, hero-фонів, коли текст поверх зображення.

## Приклад

```html
<img src="product.jpg" alt="Червоні кросівки" width="300">
<div class="hero" style="background-image: url('bg.jpg')"></div>
```

## Юз кейси

- `<img>` — фото товару в каталозі
- `background-image` — декоративний фон hero-секції з текстом зверху

## Документація

- [img — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
- [picture — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
