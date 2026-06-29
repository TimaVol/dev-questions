---
title: "Що таке «схлопування»?"
topic: nodejs
grade: junior
category: "HTML + CSS"
order: 53
difficulty: easy
---

## Відповідь

**Margin collapse** (схлопування зовнішніх відступів) — суміжні вертикальні `margin` двох block-елементів об'єднуються в один (зазвичай більший). Між батьком і першою/останньою дитиною без border/padding теж може схлопуватись. У **flex** і **grid** дочірні елементи margin не схлопуються між собою.

## Приклад

```html
<div class="a"></div>
<div class="b"></div>
```

```css
.a { margin-bottom: 30px; background: #eee; height: 20px; }
.b { margin-top: 20px; background: #ccc; height: 20px; }
/* Відстань між блоками: 30px, не 50px */
```

## Юз кейси

- Неочікувані відступи в article + footer
- Fix: padding на батьку, `overflow: auto`, або flex layout
- Верстка email/SSR-шаблонів у Node без «зайвих» gap

## Документація

- [Margin collapsing — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
