---
title: "Як вирішуєте проблеми з високим обсягом стилів і підтримкою великих кодових баз у великих проєктах? Які підходи та методології використовуєте для організації CSS-коду на рівні архітектури?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 28
difficulty: hard
---

## Відповідь

Великі CSS-бази страждають від **specificity wars**, **dead code** і **no ownership**. Архітектура: **ITCSS/CUBE** — шари (settings, tools, generic, elements, components, utilities); **CSS Modules / scoped styles** — colocation з компонентами; **design tokens** — єдине джерело truth; **lint** (stylelint, `@layer` order). Refactor strategy: **не big-bang** — новий код за новими правилами, old code — strangler. Метрики: unused CSS % (Coverage), bundle size per route, count of `!important`. Senior вводить **contribution rules**: новий UI — тільки через design system.

## Приклад

ITCSS + CSS layers:

```css
@layer reset, tokens, components, utilities;

@layer tokens {
  :root { --space-md: 1rem; --color-text: #1a1a1a; }
}

@layer components {
  .btn-primary {
    padding: var(--space-md);
    background: var(--color-brand);
  }
}
```

Colocation у React:

```
src/features/checkout/
  CheckoutForm.tsx
  CheckoutForm.module.css   /* тільки стилі цього feature */
  index.ts
```

## Юз кейси

- 500 KB global.css: route-based code splitting + purge unused Tailwind
- Legacy BEM + new Tailwind: `@layer components` для isolation specificity
- Quarterly audit: stylelint `no-duplicate-selectors`, видалення orphaned partials

## Документація

- [BEM — Methodology](https://en.bem.info/methodology/)
- [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
