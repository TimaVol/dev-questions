---
title: "Що таке «модель коробки» в CSS і як її можна змінити?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 25
difficulty: easy
---

## Відповідь

Кожен елемент — це коробка: content → padding → border → margin. За замовчуванням `box-sizing: content-box` — width не включає padding/border. `border-box` — width включає все.

## Приклад

```css
*, *::before, *::after {
  box-sizing: border-box;
}
.card {
  width: 200px;
  padding: 16px;
  border: 2px solid #ccc;
}
```

## Юз кейси

- Глобальний `border-box` — передбачувані розміри при верстці
- Розрахунок ширини колонок у grid без «зсуву» через padding

## Документація

- [Box model — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)
