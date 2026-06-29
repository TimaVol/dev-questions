---
title: "Які теги з найсвіжіших оновлень ви знаєте?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 11
difficulty: easy
---

## Відповідь

З нових HTML — `<dialog>`, `<details>/<summary>`, `<search>`, Popover API. У CSS — container queries і `:has()`. Слідкуй за Baseline на MDN, щоб знати, що вже підтримують усі браузери.

## Приклад

```html
<dialog id="modal">
  <p>Підтвердіть дію</p>
  <button onclick="modal.close()">OK</button>
</dialog>
<button onclick="modal.showModal()">Відкрити</button>
```

## Юз кейси

- Нативний модальний діалог без сторонніх бібліотек
- Акордеон через `<details>` замість кастомного JS

## Документація

- [dialog — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [:has() — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
