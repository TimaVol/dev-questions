---
title: "Що таке data-атрибути, в яких випадках їх використовуєте?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 13
difficulty: easy
---

## Відповідь

`data-*` — кастомні атрибути для зберігання даних у DOM. Читаються через `element.dataset` у camelCase (`data-user-id` → `dataset.userId`).

## Приклад

```html
<button data-product-id="42" data-action="add-to-cart">Купити</button>
```

```js
document.querySelector('button').dataset.productId; // "42"
```

## Юз кейси

- Зберігання ID елемента для JS-обробника без inline-скриптів
- CSS-селектори стану: `[data-state="open"]`

## Документація

- [data-* attributes — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*)
