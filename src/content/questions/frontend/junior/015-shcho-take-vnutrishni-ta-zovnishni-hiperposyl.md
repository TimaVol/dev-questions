---
title: "Що таке внутрішні та зовнішні гіперпосилання і які вони мають атрибути?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 15
difficulty: easy
---

## Відповідь

Внутрішні ведуть на сторінки того ж сайту (`/about`, `#section`). Зовнішні — на інший домен; для нової вкладки додавай `target="_blank"` і `rel="noopener noreferrer"`.

## Приклад

```html
<a href="/about">Про нас</a>
<a href="https://github.com" target="_blank" rel="noopener noreferrer">
  GitHub
</a>
```

## Юз кейси

- Навігація по сайту через відносні шляхи
- Посилання на документацію або соцмережі в новій вкладці

## Документація

- [a element — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
