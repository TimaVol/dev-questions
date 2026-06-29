---
title: "Як керувати секретами у проєктах?"
topic: frontend
grade: senior
category: "Безпека"
order: 110
difficulty: medium
---

## Відповідь

Секрети — те, що не має потрапити в git чи client bundle. **Правила:** `.env` у `.gitignore`, `.env.example` без значень; **frontend env** (`VITE_`, `NEXT_PUBLIC_`) — завжди public, туди лише publishable keys; **server-only secrets** — CI/CD secrets (GitHub Actions, Vault, AWS SSM), runtime injection. Ротація ключів — план і automation. Pre-commit: **gitleaks/trufflehog** scan. Якщо secret leaked — rotate immediately, не «revert commit». Monorepo: turbo/env per package, не shared `.env` з DB password у frontend package.

## Приклад

```bash
# .env.example (committed)
VITE_API_URL=https://api.staging.example.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# .env (gitignored)
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...  # server only!
```

```yaml
# GitHub Actions — secrets
jobs:
  deploy:
    steps:
      - run: npm run build
        env:
          VITE_API_URL: ${{ secrets.API_URL }}
          # STRIPE_SECRET only in server deploy step, not build
```

```json
// package.json — pre-commit
"lint-staged": {
  "*": "gitleaks protect --staged"
}
```

## Юз кейси

- Stripe: `pk_` у frontend, `sk_` лише на server webhook handler
- Rotated API key: update Vault → redeploy, zero downtime з dual-key period
- Junior committed `.env`: gitleaks block + rotate all keys in file

## Документація

- [Encrypted secrets — GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
- [Secrets management — OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
