---
title: "Як створити форму в HTML і забезпечити її валідацію?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 17
difficulty: medium
---

## Відповідь

Форма: `<form>`, `<label for>`, `<input>` з атрибутами `required`, `type="email"`, `pattern`, `minlength`. Клієнтська валідація — для UX; серверна обов'язкова для безпеки.

## Приклад

```html
<form>
  <label for="email">Email</label>
  <input id="email" type="email" required minlength="5">
  <button type="submit">Надіслати</button>
</form>
```

## Юз кейси

- Реєстрація з перевіркою формату email до відправки
- Форма зворотного зв'язку з обов'язковими полями

## Документація

- [form — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [Constraint validation — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation)
