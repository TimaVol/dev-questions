---
title: "Які способи центрування елемента по горизонталі і вертикалі ви знаєте?"
topic: nodejs
grade: junior
category: "HTML + CSS"
order: 50
difficulty: easy
---

## Відповідь

**Flexbox:** `display: flex; justify-content: center; align-items: center;` на контейнері (для вертикалі потрібна висота, напр. `min-height: 100vh`).

**Grid:** `display: grid; place-items: center;`.

**Класика:** `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` на дочірньому елементі.

## Приклад

```css
.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.modal-box {
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
}
```

## Юз кейси

- Модальне вікно по центру екрана
- Центрування loader/spinner у full-page layout
- Hero-секція з текстом по центру

## Документація

- [Centering — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_and_the_block_formatting_context)
