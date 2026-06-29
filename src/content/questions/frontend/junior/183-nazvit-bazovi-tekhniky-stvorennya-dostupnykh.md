---
title: "Назвіть базові техніки створення доступних вебінтерфейсів."
topic: frontend
grade: junior
category: "Accessibility"
order: 183
difficulty: medium
---

## Відповідь

Семантичний HTML, `<label for>`, alt на img, контраст 4.5:1, focus-visible стилі, aria лише коли HTML не вистачає, логічний порядок табуляції, не покладатись лише на колір.

## Приклад

```html
<label for="search">Пошук</label>
<input id="search" type="search" aria-describedby="search-hint">
<span id="search-hint">Мінімум 3 символи</span>
```

## Юз кейси

- Помилка форми — `aria-invalid` і `aria-describedby` на помилку
- Skip link «Перейти до контенту» для клавіатури

## Документація

- [Accessibility — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility)
- [ARIA — MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
