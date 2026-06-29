---
title: "Як впроваджуєте нові технології або практики в команду?"
topic: frontend
grade: senior
category: "Загальні запитання"
order: 6
difficulty: medium
---

## Відповідь

Нова практика проходить через цикл: проблема → spike → pilot → adoption → документація. Спочатку показую біль: «e2e падають через flaky селектори — ось 3 інциденти за місяць». Потім spike на 1–2 дні на реальній задачі, не на hello-world. Pilot — один модуль або одна команда, з метриками до/після. Якщо виграш є — ADR, onboarding doc, пара хвилин на demo в команді. Не впроваджую top-down без buy-in: даю людям спробувати, збираю feedback. Rollback plan обов'язковий — якщо Playwright не зайде, Cypress лишається.

## Приклад

Впровадження Biome замість ESLint+Prettier:

1. **Spike:** міграція одного пакета в monorepo, порівняння часу lint у CI (4 хв → 45 с).
2. **Pilot:** нові PR лише через Biome, старі файли — поступово.
3. **ADR:** зафіксовано правила, `biome.json` у shared config.
4. **Demo:** 15 хв на team sync — як autofix у pre-commit.

## Юз кейси

- Заміна Jest на Vitest: pilot на unit-тестах utils, потім components
- Впровадження feature flags (LaunchDarkly/Unleash): спочатку один експеримент, потім стандарт для релізів
- TypeScript strict mode: `strictNullChecks` на новому модулі, поступове розширення з `// @ts-expect-error` backlog
