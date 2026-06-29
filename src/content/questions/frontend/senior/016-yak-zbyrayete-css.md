---
title: "Як збираєте CSS?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 16
difficulty: medium
---

## Відповідь

CSS pipeline залежить від масштабу, але типовий senior-стек: **Vite/webpack** → **PostCSS** (autoprefixer, postcss-preset-env) → **purge/tree-shake** невикористаних класів (Tailwind content paths, PurgeCSS) → **code split** по route/chunk. Для критичного CSS — extract above-the-fold (critters, або ручний critical inline для landing). Source maps у dev, minify у prod (cssnano, lightningcss). CSS Modules / scoped styles — щоб уникнути global leaks. Monorepo: shared tokens package, один postcss config. Міряю результат: розмір CSS bundle, unused bytes у Coverage tab.

## Приклад

```js
// vite.config.ts
export default {
  css: {
    modules: { localsConvention: 'camelCase' },
    postcss: './postcss.config.js',
  },
  build: {
    cssCodeSplit: true, // окремий CSS per route
  },
};
```

```js
// postcss.config.js
export default {
  plugins: {
    'postcss-preset-env': { stage: 2 },
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
```

## Юз кейси

- E-commerce: critical CSS inline для hero, решта async
- Monorepo з Tailwind: shared `tailwind.config` + purge по всіх packages
- Legacy з 500KB CSS: audit Coverage → видалити dead rules, modularize

## Документація

- [PostCSS](https://postcss.org/)
- [Sass — Documentation](https://sass-lang.com/documentation/)
