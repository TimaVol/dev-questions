---
title: "На що звертаєте увагу під час вибору технологій на проєкті?"
topic: frontend
grade: senior
category: "Загальні запитання"
order: 4
difficulty: hard
---

## Відповідь

Обираю не «наймодніше», а «найменший ризик для цієї команди і продукту». Критерії: (1) constraints — дедлайн, бюджет, наявні навички, hiring pool; (2) non-functional — performance, SEO, offline, a11y; (3) ops cost — хостинг, CI, моніторинг, оновлення major versions; (4) exit strategy — чи можна мігрувати без переписування всього. Порівнюю 2–3 варіанти в таблиці trade-offs, фіксую рішення в ADR. «Ми вже знаємо React» — вагомий аргумент; «новий фреймворк з 3k GitHub stars» — потребує spike і fallback-плану.

## Приклад

```markdown
# ADR-007: State management для dashboard

| Критерій        | Redux Toolkit | Zustand      | React Query only |
|-----------------|---------------|--------------|------------------|
| Команда знає    | ✅            | частково     | ✅               |
| DevTools        | ✅            | ✅           | ✅               |
| Boilerplate     | високий       | низький      | мінімальний      |
| Server cache    | окремо        | окремо       | вбудований       |

Рішення: React Query для server state + Zustand для UI state (sidebar, filters).
Відхилено Redux: overkill для 3 глобальних полів.
```

## Юз кейси

- Стартап з дедлайном 6 тижнів: Vite + React + існуюча UI-бібліотека замість custom design system
- Enterprise з 8 командами: monorepo + shared packages, а не 8 різних версій React
- Міграція CRA → Vite: оцінка breaking changes, codemod, parallel run на staging
