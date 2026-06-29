---
title: "Як подбати про безпеку вебзастосунків?"
topic: frontend
grade: senior
category: "Безпека"
order: 105
difficulty: hard
---

## Відповідь

Defense in depth: **HTTPS everywhere**; **CSP** обмежує script sources; **sanitize output** (без `dangerouslySetInnerHTML` з user input); **httpOnly cookies** для sessions; **CSRF tokens** / SameSite cookies; **CORS** мінімальний; **Subresource Integrity** на CDN scripts; **dependency audit** (`npm audit`, Dependabot); **secrets ніколи у frontend**; **RBAC** server-enforced; **rate limiting**; **security headers** (HSTS, X-Frame-Options, Referrer-Policy). Процес: threat modeling, security review на auth/payment PRs, pen test перед major release.

## Приклад

Security headers (Next.js):

```js
// next.config.js
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'; object-src 'none'" },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ],
  }];
}
```

Safe render user content:

```tsx
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userBio) }} />
```

## Юз кейси

- User-generated markdown: sanitize + CSP блокує inline scripts
- Third-party script (analytics): CSP nonce або strict allowlist domain
- Post-incident: rotate secrets, Sentry breadcrumb для auth flows

## Документація

- [Content Security Policy — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
