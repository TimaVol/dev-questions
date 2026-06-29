---
title: "Опишіть CI/CD-процес у нинішньому проєкті."
topic: frontend
grade: senior
category: "Архітектура"
order: 95
difficulty: medium
---

## Відповідь

Типовий сучасний frontend CI/CD: **PR** → lint, typecheck, unit tests, build → **preview deploy** (Vercel/Netlify) → e2e на preview → review → merge → **staging auto-deploy** → smoke tests → **manual/auto prod promote** → post-deploy monitoring. Tools: GitHub Actions, Turborepo cache, semantic-release/changesets для versioning. Secrets у CI vault. Feature flags розв'язують deploy і release. Rollback: revert commit або promote попереднього artifact — ціль <5 хв.

## Приклад

```yaml
# Simplified pipeline
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  ci:
    steps:
      - run: npm ci && npm run lint && npm run test && npm run build
  preview:
    if: github.event_name == 'pull_request'
    steps:
      - run: vercel deploy --prebuilt
  production:
    if: github.ref == 'refs/heads/main'
    steps:
      - run: vercel deploy --prebuilt --prod
      - run: npm run test:e2e:smoke -- --config baseURL=$PROD_URL
```

Branch strategy: trunk-based, short-lived feature branches, no long-lived develop.

## Юз кейси

- Hotfix: branch від tag → CI → prod deploy з approval, bypass staging
- Monorepo: `turbo run build --filter=web...[origin/main]` — лише affected
- Canary: 5% traffic через edge config перед full prod promotion

## Документація

- [GitHub Actions](https://docs.github.com/en/actions)
