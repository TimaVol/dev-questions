---
title: "Які ризики використання відʼємних значень для відступів?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 43
difficulty: medium
---

## Відповідь

Від'ємний margin зсуває елемент і може накласти його на сусідів, зламати layout або обрізати контент через `overflow: hidden` у батька. Важко підтримувати і дебажити.

## Приклад

```css
/* Ризиковано — елементи накладаються */
.overlap { margin-top: -20px; }
```

## Юз кейси

- Компенсація зайвого padding у сусідньому блоці (краще переглянути структуру)
- Візуальне «зчеплення» карток — краще через transform або grid gap

## Документація

- [Box model — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)
