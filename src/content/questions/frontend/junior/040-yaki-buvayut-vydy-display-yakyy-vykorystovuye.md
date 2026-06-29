---
title: "Які бувають види display? Який використовуєте найчастіше? У чому особливість inline-block?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 40
difficulty: medium
---

## Відповідь

Основні: `block`, `inline`, `inline-block`, `flex`, `grid`, `none`. Найчастіше — `flex` і `grid`. `inline-block` — в рядку як inline, але приймає width/height і margin як block.

## Приклад

```css
.tag {
  display: inline-block;
  padding: 4px 8px;
  width: 80px;
}
```

## Юз кейси

- `inline-block` — теги/чіпси в ряд без flex
- `flex` — навігація, toolbar

## Документація

- [display — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
