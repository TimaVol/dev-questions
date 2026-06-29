---
title: "Яке призначення файлу package.json для Node.js проєктів?"
topic: nodejs
grade: middle
category: "Node.js"
order: 21
difficulty: medium
---

## Відповідь

`package.json` — маніфест Node.js проєкту:

- **name, version** — ідентифікація пакета
- **dependencies / devDependencies** — runtime vs build/test deps
- **scripts** — `start`, `dev`, `test`, `build`
- **type: "module"** — ESM vs CJS
- **engines** — required Node version для deploy
- **exports** — public API пакета (subpath exports)
- **main / module** — entry points

npm/yarn/pnpm читають його для install, CI використовує scripts.

## Приклад

```json
{
  "name": "order-api",
  "type": "module",
  "engines": { "node": ">=20" },
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js",
    "test": "node --test"
  },
  "dependencies": {
    "fastify": "^5.0.0",
    "pg": "^8.0.0"
  }
}
```

## Юз кейси

- Lock Node 20 у Docker через engines + .nvmrc
- npm audit для security vulnerabilities
- workspaces для monorepo

## Документація

- [package.json — npm](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
