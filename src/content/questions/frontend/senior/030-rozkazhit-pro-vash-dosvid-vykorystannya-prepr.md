---
title: "Розкажіть про ваш досвід використання препроцесорів CSS (наприклад, Sass або Less) та інших інструментів для автоматизації завдань під час розробки великих проєктів."
topic: frontend
grade: senior
category: "HTML/CSS"
order: 30
difficulty: medium
---

## Відповідь

У великих проєктах Sass давав: **variables, mixins, `@use` modules**, nesting. Сьогодні багато замінено **native CSS** (custom properties, nesting) + **PostCSS** (autoprefixer, preset-env). Автоматизація: **Stylelint** (consistency), **style-dictionary** (tokens Figma → CSS/SCSS/JS), **PurgeCSS** / Tailwind purge, **postcss-import**. Senior на legacy — поступова міграція `@import` → `@use`; на greenfield — часто без Sass. Less — рідко в нових проєктах; якщо є — migration path до Sass або plain CSS.

## Приклад

Style Dictionary для multi-platform tokens:

```json
// tokens/color.json
{ "color": { "brand": { "primary": { "value": "#2563eb" } } } }
```

```scss
// output: _variables.scss
$color-brand-primary: #2563eb;
```

PostCSS pipeline:

```js
export default {
  plugins: [
    'postcss-import',
    'tailwindcss/nesting',
    'tailwindcss',
    'autoprefixer',
    ...(process.env.NODE_ENV === 'production' ? ['cssnano'] : []),
  ],
};
```

## Юз кейси

- Rebrand: зміна tokens.json → CI rebuilds CSS для web + mobile WebView
- Monorepo: shared `@company/design-tokens` package, consumers `@use`
- Legacy Less: codemod to SCSS за один sprint, freeze нових Less files

## Документація

- [Sass — Documentation](https://sass-lang.com/documentation/)
- [PostCSS](https://postcss.org/)
