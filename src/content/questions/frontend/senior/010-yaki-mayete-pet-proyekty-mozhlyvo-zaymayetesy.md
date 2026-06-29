---
title: "Які маєте пет-проєкти, можливо, займаєтеся опенсорсом?"
topic: frontend
grade: senior
category: "Загальні запитання"
order: 10
difficulty: easy
---

## Відповідь

Pet-проєкт або open source на співбесіді — це доказ ініціативи, а не CV-список технологій. Розкажіть: **яку проблему** вирішували, **ваш конкретний внесок** (архітектура, PR, maintainer), **метрики** (downloads, stars, users), **уроки** (що б зробили інакше). Навіть невеликий npm-пакет на 200 weekly downloads цінніший за «форкнув React todo». Якщо pet-проєкту немає — чесно скажіть, але покажіть side learning: contribution до docs, bugfix у бібліотеці, internal tool для команди.

## Приклад

Структура відповіді на співбесіді:

> «Pet-проєкт — CLI для аудиту a11y у CI (`a11y-scan`). Стек: TypeScript + Playwright + axe-core. Проблема: команда пропускала contrast-помилки до prod. Мій внесок: парсер HTML-звітів, GitHub Action, 3 PR у open source `@axe-core/playwright`. 40 installs/week, використовуємо в 2 проєктах. Навчився semver і backward compatibility після breaking change у v2.»

## Юз кейси

- Портфоліо: live demo + README з problem/solution/metrics сильніші за GitHub stars
- Open source: один merged PR у популярну бібліотеку показує вміння читати чужий код
- Internal tools: dashboard для метрик CI — теж valid «проєкт», якщо описати impact
