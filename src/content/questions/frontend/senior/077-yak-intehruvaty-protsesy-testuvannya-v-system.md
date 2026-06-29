---
title: "Як інтегрувати процеси тестування в системи неперервної інтеграції та розгортання?"
topic: frontend
grade: senior
category: "Тестування"
order: 77
difficulty: medium
---

## Відповідь

Етапи CI pipeline: **lint + typecheck** → **unit/integration** (Vitest, parallel) → **build** → **e2e** (Playwright на preview deploy) → **visual regression** (опційно). Fail fast: unit перед e2e. Artifacts: test reports, Playwright traces, coverage upload. CD: preview deploy на PR (Vercel/Netlify), smoke e2e на preview URL. Nightly: full e2e + perf audit. Блокувати merge на required checks. Flaky: retry 2x у CI, quarantine tag.

## Приклад

```yaml
# .github/workflows/ci.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint && npm run typecheck
      - run: npm run test:unit -- --coverage
      - run: npm run build
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
        env:
          BASE_URL: ${{ steps.deploy.outputs.preview_url }}
```

Preview + e2e:

```yaml
  deploy-preview:
    steps:
      - run: vercel deploy --prebuilt --token=$TOKEN
        id: deploy
  e2e:
    needs: deploy-preview
    steps:
      - run: BASE_URL=${{ needs.deploy-preview.outputs.url }} npm run test:e2e
```

## Юз кейси

- PR gate: unit 2min + e2e smoke 5min — merge blocked на red
- Release: full e2e suite на staging перед prod promote
- Monorepo: Turborepo запускає тести лише для affected packages

## Документація

- [GitHub Actions — Documentation](https://docs.github.com/en/actions)
- [Playwright — CI](https://playwright.dev/docs/ci)
