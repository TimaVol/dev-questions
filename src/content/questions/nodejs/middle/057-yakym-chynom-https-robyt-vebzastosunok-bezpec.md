---
title: "Яким чином HTTPS робить вебзастосунок безпечнішим?"
topic: nodejs
grade: middle
category: "Networking & API"
order: 57
difficulty: medium
---

## Відповідь

TLS (HTTPS) забезпечує три властивості:

- **Confidentiality** — шифрування AES; перехоплювач не читає body/headers/cookies
- **Integrity** — MAC/tag; tampering detectable
- **Authentication** — certificate chain proves server identity (CA-signed)

Для Node.js API це означає: JWT, session cookies, API keys, PII у request body — захищені in transit. HTTPS не замінює auth/validation — лише transport security.

Додатково: secure cookies (`Secure`, `HttpOnly`, `SameSite`), disable weak TLS versions.

## Приклад

```js
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 3600_000,
});
```

## Юз кейси

- OWASP: always HTTPS for auth endpoints
- PCI DSS requires TLS 1.2+ for payment data
- Certificate pinning для mobile API clients

## Документація

- [TLS — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security)
