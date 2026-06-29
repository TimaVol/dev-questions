---
title: "Які засоби аутентифікації та авторизації використовують у сучасних вебзастосунках?"
topic: frontend
grade: junior
category: "Робота з бекендом"
order: 150
difficulty: medium
---

## Відповідь

JWT (access + refresh token), session cookies (httpOnly), OAuth 2.0 / OpenID Connect (Google, GitHub login). Авторизація — RBAC, permissions на бекенді. Фронт зберігає токен безпечно, не в localStorage для sensitive data.

## Приклад

```js
const res = await fetch('/api/me', {
  credentials: 'include', // httpOnly cookie
});
if (res.status === 401) router.push('/login');
```

## Юз кейси

- OAuth login через Google
- Refresh token rotation для довгих сесій

## Документація

- [HTTP Authentication — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [Web Authentication — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)
