---
title: "Як обробляєте анімації в React? Як використовуєте CSS-анімації та бібліотеки для створення плавних і високопродуктивних анімацій?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 81
difficulty: medium
---

## Відповідь

Прості анімації — CSS transitions через toggle класу в React. Складні enter/exit — Framer Motion або React Transition Group. Завжди `transform`/`opacity`, `prefers-reduced-motion`. Уникаю анімації layout-властивостей у великих списках.

## Приклад

```tsx
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
    />
  )}
</AnimatePresence>
```

## Юз кейси

- Плавна поява модалки з exit-анімацією
- Page transition між маршрутами SPA
- CSS `transition` для hover-стану кнопки без бібліотеки

## Документація

- [CSS animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
- [will-change — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
