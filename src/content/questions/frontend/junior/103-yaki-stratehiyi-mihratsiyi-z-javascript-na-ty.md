---
title: "Які стратегії міграції з JavaScript на TypeScript ви знаєте?"
topic: frontend
grade: junior
category: "TypeScript"
order: 103
difficulty: medium
---

## Відповідь

Поступова міграція: `allowJs: true` у tsconfig, перейменування `.js` → `.ts` по файлах, спочатку `any`, потім уточнення типів. Починати з utils і API-шару, UI — останнім.

## Приклад

```json
// tsconfig.json
{ "compilerOptions": { "allowJs": true, "checkJs": false } }
```

## Юз кейси

- Новий модуль одразу на TS, legacy залишається JS
- Типізація API-клієнта — перший крок міграції

## Документація

- [TypeScript intro — TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Migrating from JavaScript — TypeScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
