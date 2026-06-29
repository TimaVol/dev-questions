---
title: "Якби вас попросили скласти чеклист з безпеки для вебзастосунку, що б ви туди включили?"
topic: frontend
grade: senior
category: "Безпека"
order: 111
difficulty: hard
---

## Відповідь

Чеклист для frontend + спільні з бекендом пункти. **Auth:** httpOnly cookies, short JWT TTL, refresh rotation, logout invalidates server session. **Input:** validate client (UX), sanitize HTML, never `eval(userInput)`. **Transport:** HTTPS, HSTS, TLS 1.2+. **Headers:** CSP, X-Frame-Options, nosniff, Referrer-Policy. **Dependencies:** audit weekly, pin versions, SRI on CDN. **Storage:** no secrets in localStorage, clear on logout. **CORS:** whitelist origins. **CSRF:** SameSite cookies or token. **XSS:** escape output, CSP, DOMPurify. **Monitoring:** Sentry без PII в breadcrumbs. **Compliance:** cookie consent, GDPR delete flow.

## Приклад

```markdown
## Security Checklist — Frontend Release

### Auth & Session
- [ ] Tokens in httpOnly Secure SameSite cookies
- [ ] No auth tokens in localStorage/sessionStorage
- [ ] Logout clears client state + server session

### Headers (verify in staging)
- [ ] Content-Security-Policy configured
- [ ] Strict-Transport-Security enabled
- [ ] X-Content-Type-Options: nosniff

### Input & Output
- [ ] User HTML sanitized (DOMPurify)
- [ ] No dangerouslySetInnerHTML without sanitize
- [ ] Forms: CSRF token or SameSite=Strict

### Dependencies
- [ ] npm audit — 0 high/critical
- [ ] Lockfile committed

### Secrets
- [ ] No secrets in VITE_* / NEXT_PUBLIC_*
- [ ] gitleaks pass in CI
```

## Юз кейси

- Pre-release audit: checklist у PR template, blocking merge on critical items
- SOC2 prep: document checklist + evidence screenshots
- Onboarding: new dev проходить checklist на staging deploy

## Документація

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Web Security — MDN](https://developer.mozilla.org/en-US/docs/Web/Security)
