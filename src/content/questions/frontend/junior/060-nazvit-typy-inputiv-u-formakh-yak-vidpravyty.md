---
title: "Назвіть типи інпутів у формах. Як відправити форму на сервер (без JS)?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 60
difficulty: easy
---

## Відповідь

Типи: `text`, `email`, `password`, `number`, `tel`, `url`, `date`, `checkbox`, `radio`, `file`, `hidden`, `submit`. Без JS — `<form method="POST" action="/api/login">` і `<button type="submit">`.

## Приклад

```html
<form method="POST" action="/subscribe">
  <input type="email" name="email" required>
  <button type="submit">Підписатись</button>
</form>
```

## Юз кейси

- Форма логіну з нативною відправкою на бекенд
- Пошук через GET-форму з `action="/search"`

## Документація

- [input — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [form — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
