---
title: "Що таке CI (безперервна інтеграція)?"
topic: nodejs
grade: middle
category: "Деплоймент і процес розробки"
order: 52
difficulty: medium
---

## Відповідь

**CI (Continuous Integration)** — автоматична збірка і тестування кожного push/PR. Мета — рано виявити інтеграційні проблеми.

Типовий pipeline для Node.js:
- `npm ci` — clean install
- Lint (ESLint) + typecheck (tsc)
- Unit + integration tests (`node --test`, Jest, Vitest)
- Build (якщо TS → JS)
- Security audit (`npm audit`)
- Docker image build (optional)

Tools: GitHub Actions, GitLab CI, CircleCI. Branch protection: merge лише з green CI.

## Приклад

```yaml
# .github/workflows/ci.yml (fragment)
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

## Юз кейси

- Block merge on failing tests
- Matrix test Node 20 + 22
- Cache node_modules для швидкого CI

## Документація

- [GitHub Actions — CI](https://docs.github.com/en/actions)
