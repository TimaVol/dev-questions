---
title: "У чому відмінність node-sass від dart-sass та яку версію ви використовуєте?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 22
difficulty: hard
---

## Відповідь

**LibSass (node-sass)** — deprecated C++ implementation, прив'язана до Node ABI, останній release 2020. **Dart Sass** — офіційна реалізація Sass, активно розвивається: `@use`/`@forward`, module system, нові функції (`sass:math`, `sass:color`). **sass (npm package)** — це Dart Sass. node-sass не підтримує modern syntax. Senior мігрує на `sass` package; у нових проєктах часто взагалі без Sass — **native CSS nesting**, PostCSS, Tailwind. Якщо Sass лишається — тільки Dart Sass + `@use` замість `@import` (deprecated).

## Приклад

Міграція з node-sass на sass:

```json
// package.json — було
"node-sass": "^4.14"
// стало
"sass": "^1.77.0"
```

```scss
// ❌ deprecated @import
@import 'variables';
// ✅ modules
@use 'variables' as v;
.card { padding: v.$spacing-md; color: v.$color-text; }
```

```js
// vite.config — sass автоматично через vite
export default { css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } } };
```

## Юз кейси

- Legacy build: node-sass падає на Node 20 → міграція на sass за 1 sprint
- Monorepo: shared `@use 'tokens'` package замість copy-paste variables
- Greenfield: skip Sass, CSS custom properties + PostCSS nesting

## Документація

- [Sass: Dart Sass](https://sass-lang.com/dart-sass/)
- [Sass modules](https://sass-lang.com/documentation/at-rules/use/)
