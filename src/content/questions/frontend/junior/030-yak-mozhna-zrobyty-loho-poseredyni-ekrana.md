---
title: "Як можна зробити лого посередині екрана?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 30
difficulty: easy
---

## Відповідь

Найпростіше — flex на батьківському контейнері з `justify-content: center` і `align-items: center` на всю висоту viewport.

## Приклад

```css
.splash {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

## Юз кейси

- Splash screen при завантаженні додатку
- Центрування лого на landing page

## Документація

- [Centering — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_and_the_block_formatting_context)
