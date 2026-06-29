---
title: "Поясніть принципи Cross-Site Scripting (XSS) і Cross-Site Request Forgery (CSRF) атаки та способи захисту від них."
topic: frontend
grade: senior
category: "Безпека"
order: 106
difficulty: medium
---

## Відповідь

**XSS** — атакуючий інжектить script, що виконується в браузері жертви (stored, reflected, DOM-based). Краде cookies/tokens, keylog, deface. Захист: escape output, CSP `script-src`, sanitize HTML (DOMPurify), уникати `eval`/`innerHTML` з user data, httpOnly cookies. **CSRF** — атакуючий змушує браузер залогіненого користувача надіслати небажаний request (form/image до bank.com/transfer). Захист: **SameSite=Strict/Lax** cookies, **CSRF token** у forms/API headers, перевірка `Origin`/`Referer`, re-auth для чутливих дій.

## Приклад

Stored XSS prevention:

```tsx
// ❌ vulnerability
<div dangerouslySetInnerHTML={{ __html: comment.text }} />

// ✅ sanitize
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.text, { ALLOWED_TAGS: ['b','i','a'] }) }} />
```

CSRF token:

```tsx
async function transferFunds(to: string, amount: number) {
  const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  await fetch('/api/transfer', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf! },
    body: JSON.stringify({ to, amount }),
  });
}
```

```html
<meta name="csrf-token" content="{{ serverGeneratedToken }}">
```

## Юз кейси

- Rich text comments: allowlist tags, strip `<script>`, CSP як другий шар
- Cookie session API: SameSite=Lax + CSRF header на POST/PUT/DELETE
- DOM XSS через `location.hash`: ніколи не передавати hash в innerHTML — textContent

## Документація

- [Cross-site scripting — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS)
- [Cross-site request forgery — MDN](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)
