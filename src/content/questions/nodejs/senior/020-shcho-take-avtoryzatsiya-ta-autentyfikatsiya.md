---
title: "Що таке авторизація та аутентифікація?"
topic: nodejs
grade: senior
category: "Архітектура"
order: 20
difficulty: easy
---

## Відповідь

**Аутентифікація (AuthN)** — перевірка особи: «хто ви?» (логін/пароль, OAuth, mTLS, API key). **Авторизація (AuthZ)** — «що вам дозволено?» (RBAC, ABAC, scopes, policy engine).

У Node.js API типовий flow: middleware AuthN (перевірка JWT, пошук сесії) → middleware AuthZ (перевірка ролі, власності ресурсу). JWT у `Authorization: Bearer` або сесія в httpOnly cookie (потрібен захист від CSRF).

На рівні senior: ротація токенів, зберігання refresh token, принцип найменших привілеїв, auth між сервісами (mTLS/OAuth client credentials), не змішувати чутливі дані AuthN у JWT payload без шифрування.

## Приклад

```js
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
    if (!req.user.roles.includes(role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

app.delete('/orders/:id', authenticateJwt, requireRole('admin'), deleteOrder);
```

## Юз кейси

- Централізована auth на API Gateway vs перевірка JWT у кожному сервісі
- Multi-tenant SaaS: row-level security + tenantId у токені
- OAuth2-делегування для інтеграцій з третіми сторонами

## Документація

- [HTTP Authentication — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
