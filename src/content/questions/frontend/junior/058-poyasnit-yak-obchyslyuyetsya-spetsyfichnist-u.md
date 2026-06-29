---
title: "Поясніть, як обчислюється специфічність у CSS-селекторах."
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 58
difficulty: medium
---

## Відповідь

Специфічність: (inline, id, class/атрибут/псевдоклас, тег/псевдоелемент). `#nav .link` переможе `.link`. При рівності — перемагає правило, що йде пізніше в CSS.

## Приклад

```css
.link { color: black; }        /* 0,0,1,0 */
#nav .link { color: blue; }    /* 0,1,1,0 — перемагає */
```

## Юз кейси

- Чому стиль не застосовується — перевірити специфічність у DevTools
- Уникнення надмірно глибоких селекторів у BEM

## Документація

- [Specificity — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [Selectors — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)
