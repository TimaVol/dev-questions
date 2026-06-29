---
title: "Які найкращі практики для забезпечення безпеки вебзастосунків?"
topic: frontend
grade: senior
category: "Безпека"
order: 107
difficulty: hard
---

## Відповідь

Defense in depth — безпека на кожному шарі. Frontend checklist: **CSP** (обмежити script-src), **HTTPS everywhere**, **httpOnly Secure SameSite cookies** для токенів, **sanitize user input** перед `dangerouslySetInnerHTML`, **Subresource Integrity** на CDN scripts, **залежності** — `npm audit`, Dependabot, lockfile. Auth: короткий access token, refresh rotation, logout clears all storage. Headers: `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options: nosniff`. Не зберігайте secrets у frontend env (VITE_* — public). Security — shared responsibility: frontend не замінює server validation.

## Приклад

```html
<!-- CSP у meta або server header -->
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:;">
```

```ts
// Sanitize HTML від user (DOMPurify)
import DOMPurify from 'dompurify';

function UserComment({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}
```

```ts
// Ніколи так
const API_KEY = 'sk_live_xxx'; // visible у bundle!
// OK — public anon key з rate limit на server
const PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
```

## Юз кейси

- User-generated content (comments): DOMPurify + CSP без `unsafe-inline` scripts
- OAuth SPA: PKCE flow, no client secret у browser
- Third-party scripts (analytics): load via tag manager з consent, SRI hashes

## Документація

- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [Web Security — MDN](https://developer.mozilla.org/en-US/docs/Web/Security)
