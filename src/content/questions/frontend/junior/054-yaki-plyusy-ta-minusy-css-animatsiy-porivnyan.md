---
title: "Які плюси та мінуси CSS-анімацій порівняно з JS-анімаціями?"
topic: frontend
grade: junior
category: "Основи HTML/CSS"
order: 54
difficulty: medium
---

## Відповідь

CSS-анімації: прості, на compositor thread, без JS overhead — але важко синхронізувати з логікою. JS (Web Animations API, GSAP): повний контроль, пауза, ланцюжки — але більше коду і навантаження на main thread.

## Приклад

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.modal { animation: fadeIn 0.3s ease; }
```

## Юз кейси

- CSS — простий fade/slide на hover або поява модалки
- JS — складна анімація з прив'язкою до scroll або drag

## Документація

- [Animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
