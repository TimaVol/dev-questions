---
title: "Які є варіанти позиціонування елемента на сторінці?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 39
difficulty: easy
---

## Відповідь

`static` — за замовчуванням, у потоці документа. `relative` — зсув відносно себе. `absolute` — відносно найближчого positioned предка. `fixed` — відносно viewport. `sticky` — гібрид relative і fixed при скролі.

## Приклад

```css
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
}
.header { position: sticky; top: 0; }
```

## Юз кейси

- `absolute` — badge на аватарі
- `sticky` — header, що прилипає при скролі

## Документація

- [position — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
