---
title: "Якою буде відстань між цими двома елементами:"
topic: nodejs
grade: junior
category: "HTML + CSS"
order: 54
difficulty: easy
---

## Відповідь

Якщо два block-елементи йдуть один за одним з `margin-bottom` першого і `margin-top` другого — спрацює **margin collapse**: відстань = `max(margin-bottom, margin-top)`, не сума. Якщо між ними є border, padding, inline content або flex/grid — схлопування не відбувається, відстань = сума margins.

## Приклад

```css
.box1 { margin-bottom: 40px; }
.box2 { margin-top: 25px; }
/* Відстань: 40px (max), не 65px */

.wrapper { display: flex; flex-direction: column; }
/* У flex-контейнері: 40 + 25 = 65px */
```

```html
<div class="box1">A</div>
<div class="box2">B</div>
```

## Юз кейси

- Типове питання на співбесіді з margin collapse
- Вибір flex замість block для передбачуваних gap
- `gap` у flex/grid замість margin між елементами

## Документація

- [Flexbox — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
- [Box model — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)
