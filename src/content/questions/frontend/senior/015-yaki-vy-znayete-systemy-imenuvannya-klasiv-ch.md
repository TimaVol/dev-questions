---
title: "Які ви знаєте системи іменування класів? Чи взагалі використовуєте якісь?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 15
difficulty: medium
---

## Відповідь

Система іменування потрібна, щоб стилі не перетворились на soup of classes. Основні підходи: **BEM** (Block__Element--Modifier) — передбачуваність і ізоляція; **CUBE CSS** (Composition, Utility, Block, Exception) — баланс utility і компонентів; **SMACSS** (Base, Layout, Module, State, Theme) — шарова організація. У React/ Vue часто BEM-подібне на рівні CSS Modules або scoped styles: `Card_title`. З Tailwind — utility-first, але компонентні `@apply` або design tokens для повторюваних патернів. Головне правило senior: **consistency важливіша за догма** — одна система на проєкт, documented у style guide, enforced у review.

## Приклад

```css
/* BEM */
.search-form { }
.search-form__input { }
.search-form__input--invalid { }

/* CUBE: utility + block */
.card { /* block styles */ }
.card.is-loading { /* exception */ }
/* + utilities: .flex, .gap-4 з design system */
```

У CSS Modules:

```css
/* SearchForm.module.css */
.root { }
.input { }
.inputInvalid { }
```

## Юз кейси

- Legacy без системи: поступова міграція — нові компоненти BEM, старі не чіпаємо до рефакторингу
- Design system: токени + BEM для складних компонентів, utilities для layout
- Cross-team monorepo: shared naming convention у `CONTRIBUTING.md`

## Документація

- [BEM — Methodology](https://en.bem.info/methodology/)
- [CUBE CSS](https://cube.fyi/)
