---
title: "В чому переваги і недоліки NPM проти Yarn/PNPM?"
topic: nodejs
grade: junior
category: "JavaScript"
order: 35
difficulty: medium
---

## Відповідь

**npm** — вбудований у Node, найширша сумісність, `npm ci`, workspaces. Мінуси: історично повільніший install (покращився в v7+).

**Yarn** — швидший install, Plug'n'Play (Berry) без `node_modules` (складніша сумісність).

**pnpm** — симлінки + глобальний store: менше диска, строгіша ізоляція залежностей (немає phantom dependencies).

Вибір часто диктує команда/CI; API `package.json` однаковий.

## Приклад

```bash
# npm
npm install

# pnpm — економія місця на монорепо
pnpm install

# yarn berry
yarn install
```

## Юз кейси

- Монорепо — pnpm workspaces або npm workspaces
- Legacy-проєкт — npm, щоб не міняти lockfile
- Швидкий CI — pnpm з кешем store

## Документація

- [npm — Docs](https://docs.npmjs.com/)
