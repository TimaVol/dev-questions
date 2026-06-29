---
title: "Для чого існують різні рівні заголовків, якщо розмір можна встановити стилями?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 38
difficulty: easy
---

## Відповідь

`<h1>`–`<h6>` задають семантичну ієрархію документа, а не лише розмір. Скрінрідери будують outline, пошуковики оцінюють структуру. Стилі — окремо через CSS.

## Приклад

```html
<h1>Головний заголовок сторінки</h1>
<section>
  <h2>Розділ</h2>
  <h3>Підрозділ</h3>
</section>
```

## Юз кейси

- SEO — один `<h1>` на сторінку з логічною вкладеністю
- Accessibility — навігація по заголовках у VoiceOver

## Документація

- [Headings — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)
