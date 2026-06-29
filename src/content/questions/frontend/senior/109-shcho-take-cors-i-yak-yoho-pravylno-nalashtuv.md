---
title: "Що таке CORS і як його правильно налаштувати?"
topic: frontend
grade: senior
category: "Безпека"
order: 109
difficulty: easy
---

## Відповідь

**CORS (Cross-Origin Resource Sharing)** — механізм браузера, що дозволяє серверу явно дозволити cross-origin запити. Same-Origin Policy блокує `fetch` з `https://app.com` до `https://api.com` без CORS headers. **Simple requests** (GET, POST form) — браузер додає `Origin`, сервер відповідає `Access-Control-Allow-Origin`. **Preflight** (OPTIONS) — для custom headers, PUT/DELETE, `Content-Type: application/json`. З cookies: `credentials: 'include'` + `Access-Control-Allow-Credentials: true` + **конкретний origin** (не `*`). Dev workaround: Vite proxy — same origin у dev. Production: whitelist origins, не `*`.

## Приклад

```ts
// Express CORS — правильно
import cors from 'cors';

app.use(cors({
  origin: ['https://app.example.com', 'https://staging.example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

```ts
// Frontend fetch з cookies
fetch('https://api.example.com/me', {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
});
```

```ts
// vite.config.ts — dev proxy (no CORS issue)
export default {
  server: {
    proxy: { '/api': { target: 'http://localhost:3001', changeOrigin: true } },
  },
};
```

## Юз кейси

- SPA на `app.com`, API на `api.com` — CORS whitelist + credentials
- Third-party widget: public API з `Access-Control-Allow-Origin: *` без cookies
- CORS error у dev: proxy або налаштувати API, не `mode: 'no-cors'` (opaque response useless)

## Документація

- [CORS — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
