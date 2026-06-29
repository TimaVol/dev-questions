---
title: "Які методи ізоляції стилів ви знаєте?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 19
difficulty: easy
---

## Відповідь

CSS Modules, Vue scoped, Shadow DOM, BEM-префікси, CSS-in-JS (styled-components), `@layer`. Мета — уникнути колізій у глобальному namespace.

## Приклад

```tsx
import styles from './Card.module.css';
export function Card({ children }) {
  return <div className={styles.card}>{children}</div>;
}
```

## Юз кейси

- CSS Modules у React design system
- Shadow DOM для web components/widget
- BEM у legacy без bundler

## Документація

- [CSS Modules — Vite](https://vite.dev/guide/features.html#css-modules)
- [Using shadow DOM — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
