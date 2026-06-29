---
title: "Чи валідний цей HMTL? Виправте всі помилки. Розкажіть про валідність HMTL загалом."
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 56
difficulty: easy
---

## Відповідь

Валідний HTML має правильну вкладеність (блок не всередині `<p>`), унікальні `id`, `alt` на `<img>`, зв'язані `<label for>`. Перевіряють через validator.w3.org або вбудований валідатор IDE.

## Приклад

```html
<!-- Невалідно -->
<p><div>Текст</div><img src="photo.jpg"></p>

<!-- Валідно -->
<main>
  <p>Текст</p>
  <img src="photo.jpg" alt="Опис фото">
</main>
```

## Юз кейси

- CI-перевірка HTML перед деплоєм
- Виправлення помилок для кращої сумісності з браузерами

## Документація

- [HTML validation — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Debugging_HTML)
