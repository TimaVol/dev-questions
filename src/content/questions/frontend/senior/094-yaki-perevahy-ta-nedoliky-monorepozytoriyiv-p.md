---
title: "Які переваги та недоліки монорепозиторіїв проти використання різних репозиторіїв?"
topic: frontend
grade: senior
category: "Архітектура"
order: 94
difficulty: hard
---

## Відповідь

**Monorepo pros:** атомарні cross-package changes, спільний tooling (ESLint, TS), internal packages без publish cycle, єдиний CI visibility. **Cons:** складність CI, повільно без caching (Turborepo/Nx), access control складніший, великий clone. **Multi-repo pros:** незалежний release, автономія команд, менші clones. **Cons:** version drift, дубльовані configs, cross-repo PR болючі. Senior вибір: monorepo коли **shared design system + кілька apps** в одній org; multi-repo коли **незалежні продукти/команди** зі стабільними API contracts.

## Приклад

Turborepo monorepo:

```
apps/
  web/          # Next.js customer app
  admin/        # Vite admin
packages/
  ui/           # shared components
  config-eslint/
  tsconfig/
turbo.json      # pipeline cache
```

```json
// turbo.json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "test": { "dependsOn": ["build"] }
  }
}
```

Cross-package change one PR:

```diff
packages/ui/Button.tsx  — add variant
apps/web/Page.tsx       — use variant
apps/admin/Form.tsx     — use variant
```

## Юз кейси

- Design token change: один PR оновлює ui package + обидва apps — без version ping-pong
- Open source lib + docs site: monorepo природно підходить
- Acquired startup окремий продукт: multi-repo до інтеграції, що виправдовує merge

## Документація

- [Workspaces — npm](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [Monorepos — Turborepo](https://turbo.build/repo/docs)
