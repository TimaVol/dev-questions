---
title: "У чому різниця між <div> і <span>."
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 12
difficulty: easy
---

## Відповідь

`<div>` — блочний контейнер, займає всю ширину рядка. `<span>` — inline-елемент для фрагмента тексту, не ламає потік рядка.

## Приклад

```html
<div class="card">Блоковий контейнер</div>
<p>Текст з <span class="highlight">виділеним фрагментом</span>.</p>
```

## Юз кейси

- `<div>` — обгортка для секції або картки
- `<span>` — підсвітка слова, badge всередині речення

## Документація

- [Block elements — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)
