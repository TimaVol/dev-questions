---
title: "Як впроваджуєте концепцію «компонентного» підходу у вашому CSS-коді? Які стратегії використовуєте для створення повторно використовуваних і легко модифікованих компонентів у ваших стилях?"
topic: frontend
grade: middle
category: "HTML/CSS"
order: 28
difficulty: medium
---

## Відповідь

Компонентний CSS: один блок = один файл (BEM `.card`, `.card__title`, `.card--featured`). Модифікатори замість перевизначень. Design tokens для кольорів і відступів.

## Приклад

```css
.card { padding: var(--space-md); border-radius: 8px; }
.card__title { font-weight: 600; }
.card--featured { border: 2px solid var(--brand); }
```

## Юз кейси

- BEM у статичному HTML/CSS
- CSS Modules з композицією класів
- Storybook для перевикористовуваних блоків

## Документація

- [BEM — Methodology](https://en.bem.info/methodology/)
- [Design tokens — web.dev](https://web.dev/learn/design-systems/design-tokens/)
