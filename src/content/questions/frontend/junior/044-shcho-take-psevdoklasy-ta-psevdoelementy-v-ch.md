---
title: "Що таке псевдокласи та псевдоелементи? В чому між ними різниця? Як ви використовуєте псевдокласи та псевдоелементи в CSS?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 44
difficulty: easy
---

## Відповідь

Псевдоклас (`:hover`, `:focus`, `:nth-child`) — стан або позиція існуючого елемента, один двокрапка. Псевдоелемент (`::before`, `::after`) — віртуальний елемент для декоративного контенту, два двокрапки.

## Приклад

```css
a:hover { color: blue; }
.quote::before { content: '"'; }
```

## Юз кейси

- `:focus-visible` для доступного фокусу клавіатурою
- `::after` для декоративної лінії під заголовком

## Документація

- [Pseudo-classes — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)
- [Pseudo-elements — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)
