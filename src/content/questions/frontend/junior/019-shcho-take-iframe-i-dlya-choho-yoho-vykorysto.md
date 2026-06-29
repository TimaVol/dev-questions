---
title: "Що таке iframe і для чого його використовують?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 19
difficulty: easy
---

## Відповідь

`<iframe>` вбудовує іншу HTML-сторінку всередину поточної. Використовують для карт, відео, платіжних віджетів або legacy-контенту з іншого домену.

## Приклад

```html
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="600" height="450"
  loading="lazy"
  title="Карта офісу"
></iframe>
```

## Юз кейси

- Вбудована Google Maps на сторінці контактів
- Embed відео з YouTube або стороннього віджета

## Документація

- [iframe — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
