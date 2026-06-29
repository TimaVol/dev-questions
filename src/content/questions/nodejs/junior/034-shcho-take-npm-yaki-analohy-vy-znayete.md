---
title: "Що таке NPM? Які аналоги ви знаєте?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 34
difficulty: easy
---

## Відповідь

**npm** (Node Package Manager) — стандартний менеджер пакетів Node: реєстр [npmjs.com](https://www.npmjs.com), CLI для install/publish, `package.json` + lockfile (`package-lock.json`). Аналоги: **Yarn** (Classic і Berry), **pnpm** (content-addressable store, економія диска), **Bun** (install + runtime). Усі читають `package.json`.

## Приклад

```bash
npm init -y
npm install express
npm install -D typescript vitest
npm run build
```

```json
{
  "name": "my-api",
  "scripts": { "start": "node dist/index.js" },
  "dependencies": { "express": "^4.21.0" }
}
```

## Юз кейси

- Публікація внутрішнього пакета в private registry (Verdaccio)
- `npm ci` у CI для детермінованого білду з lockfile
- `npx` для одноразового запуску CLI без глобального install

## Документація

- [npm — Docs](https://docs.npmjs.com/)
