---
title: "У чому небезпека виконання коду, що надходить від користувача?"
topic: frontend
grade: junior
category: "Загальні питання"
order: 4
difficulty: medium
---

## Відповідь

Якщо вставити user input як HTML або JS, зловмисник виконає свій скрипт у браузері жертви — це XSS. Типові вектори: innerHTML, eval(), небезпечні шаблони.

## Приклад

```js
// Небезпечно — виконає <script>
element.innerHTML = userComment;

// Безпечно — текст як текст
element.textContent = userComment;
```

## Юз кейси

- Коментарі та відгуки з user-generated content
- Rich text editor, де потрібен HTML — санітизація через DOMPurify

## Документація

- [XSS — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_xss)
- [innerHTML — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
