---
title: "Які нові інструменти ви почали використовувати і можете порекомендувати?"
topic: frontend
grade: senior
category: "Загальні запитання"
order: 14
difficulty: hard
---

## Відповідь

Інструмент рекомендую лише якщо він вирішив конкретний біль у production. Формат: біль → інструмент → результат → обмеження. Популярні кандидати 2024–2025: Vite (швидкий dev/build), Playwright (стабільніший e2e), Biome (lint+format в одному), Turborepo (monorepo cache), React Query v5, Zod (runtime validation), Storybook 8, Oxlint (швидкий lint). Не впроваджуйте інструмент «бо модно» — spike, метрики, rollback. Senior каже не лише «що», а й «коли не варто»: Playwright overkill для landing з 2 сторінками.

## Приклад

```markdown
**Інструмент:** Playwright
**Біль:** Cypress flaky на CI (15% red builds)
**Результат:** auto-wait, trace on failure → debug 5 хв замість години
**Обмеження:** потрібен окремий pipeline step, +2 хв до CI

**Інструмент:** Biome
**Біль:** ESLint+Prettier 6 хв lint на monorepo
**Результат:** 40 с, один config file
```

## Юз кейси

- CI optimization: Turborepo remote cache — build з 12 хв до 3 хв
- DX: `vite-plugin-checker` — TypeScript errors у браузері під час dev
- Observability: Sentry Session Replay для відтворення UI-багів
