---
title: "Назвіть відмінності між @import, @use та @forward в Sass."
topic: frontend
grade: senior
category: "HTML/CSS"
order: 23
difficulty: medium
---

## Відповідь

**@import** (deprecated) — глобальний namespace, дублює CSS при multiple imports, повільний, конфлікти імен. **@use** — завантажує модуль один раз, variables/mixins доступні через namespace (`v.$color` або `@use 'x' as *`). **@forward** — re-export модуля для інших: `@forward 'tokens'` у `_index.scss`, consumers роблять `@use 'design-system'`. Правило: один entry `_index.scss` з `@forward`, consumers — `@use 'design-system' as ds`. Private members: prefix `_` (`$_internal`).

## Приклад

```scss
// _tokens.scss
$color-primary: #2563eb;
$spacing-md: 1rem;

// _mixins.scss
@mixin focus-ring {
  outline: 2px solid $color-primary;
  outline-offset: 2px;
}

// index.scss — public API
@forward 'tokens';
@forward 'mixins';

// button.scss — consumer
@use '../design-system' as ds;

.button {
  padding: ds.$spacing-md;
  background: ds.$color-primary;
  &:focus-visible { @include ds.focus-ring; }
}
```

## Юз кейси

- Design system package: `@forward` hides internal partials, stable public API
- Refactor legacy: replace `@import 'variables'` → `@use 'variables' as v` file by file
- Code review: catch `@import` у new PR — lint rule `scss/at-import-no-partial`

## Документація

- [@use — Sass](https://sass-lang.com/documentation/at-rules/use/)
- [@forward — Sass](https://sass-lang.com/documentation/at-rules/forward/)
