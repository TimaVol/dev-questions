---
title: "У чому різниця між margin і padding?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 26
difficulty: easy
---

## Відповідь

Padding — відступ всередині елемента, між контентом і border. Margin — зовнішній відступ між елементами. Margin може зливатися (margin collapse), padding — ні.

## Приклад

```css
.card {
  padding: 16px;   /* простір всередині картки */
  margin: 24px 0;  /* відступ між картками */
}
```

## Юз кейси

- Padding для «повітря» всередині кнопки навколо тексту
- Margin між секціями сторінки

## Документація

- [Box model — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)
