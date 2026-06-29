---
title: "Поверхово опишіть, як відбувається білд проєкту?"
topic: frontend
grade: middle
category: "Загальні запитання"
order: 6
difficulty: easy
---

## Відповідь

Bundler будує граф залежностей, транспілює TS/JSX, мініфікує, tree-shake, хешує assets у `dist/`. SSG (Astro, Next) генерує HTML на етапі білду.

## Приклад

```bash
npm run build   # vite build → dist/assets/index-[hash].js
```

## Юз кейси

- CI з build на кожен PR
- Аналіз bundle size
- Вибір SSR vs SSG

