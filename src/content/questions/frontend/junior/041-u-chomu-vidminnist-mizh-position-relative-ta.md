---
title: "У чому відмінність між position: relative та position: absolute ?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 41
difficulty: medium
---

## Відповідь

`relative` зсуває елемент відносно його звичайної позиції в потоці, місце в layout зберігається. `absolute` виймає елемент з потоку і позиціонує відносно найближчого positioned предка.

## Приклад

```css
.card { position: relative; }
.card__badge {
  position: absolute;
  top: -4px;
  right: -4px;
}
```

## Юз кейси

- `relative` на батьківському контейнері для absolute-дочірніх
- Badge або tooltip, прив'язаний до кутка елемента

## Документація

- [position — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
