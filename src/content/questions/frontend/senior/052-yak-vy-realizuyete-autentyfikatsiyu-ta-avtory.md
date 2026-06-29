---
title: "Як ви реалізуєте аутентифікацію та авторизацію (якщо є) у вашому застосунку? Як ви дбаєте про безпеку та управління правами доступу на клієнтській та серверній стороні?"
topic: frontend
grade: senior
category: "JavaScript"
order: 52
difficulty: hard
---

## Відповідь

**AuthN** (хто ви): OAuth2/OIDC (Google, corporate SSO), email+password з bcrypt на сервері, magic links. **AuthZ** (що дозволено): RBAC (`admin`, `editor`), ABAC (attributes), permission scopes у JWT claims. Frontend: **ніколи не довіряйте UI-only hiding** — кнопка «Видалити» прихована, але API має перевіряти role. Токени: **access token** короткий (15 хв), **refresh token** у httpOnly Secure cookie. SPA: silent refresh через `/api/auth/refresh`. Route guards — UX; **server middleware** — security. CSRF: SameSite cookies або CSRF token для cookie-based auth.

## Приклад

```tsx
// Route guard — UX only
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  if (!user?.roles.includes('admin')) return <Navigate to="/403" />;
  return children;
}
```

```ts
// API — реальна авторизація (server)
app.delete('/api/users/:id', authenticate, authorize('admin'), deleteUser);

// fetch з credentials для httpOnly cookie
fetch('/api/users', { credentials: 'include' });
```

## Юз кейси

- B2B SaaS: OIDC + organization-scoped roles
- E-commerce: guest checkout без auth, account для history
- Token refresh: intercept 401 → refresh → retry queue, logout при refresh fail

## Документація

- [HTTP Authentication — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [Web Security — MDN](https://developer.mozilla.org/en-US/docs/Web/Security)
