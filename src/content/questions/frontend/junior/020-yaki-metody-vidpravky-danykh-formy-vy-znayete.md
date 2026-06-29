---
title: "Які методи відправки даних форми ви знаєте?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 20
difficulty: medium
---

## Відповідь

GET — дані в URL (`?q=пошук`), видно в адресному рядку, для пошуку та фільтрів. POST — дані в тілі запиту, для форм з паролями та створенням ресурсів.

## Приклад

```html
<!-- GET — параметри в URL -->
<form method="GET" action="/search">
  <input name="q" type="search">
</form>

<!-- POST — дані в body -->
<form method="POST" action="/login">
  <input name="password" type="password">
</form>
```

## Юз кейси

- Пошук товарів через GET з query-параметрами
- Логін і реєстрація через POST

## Документація

- [form — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [Sending form data — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data)
