---
title: "Як ви б дизайнили систему для високої доступності та масштабування?"
topic: frontend
grade: senior
category: "Архітектура"
order: 97
difficulty: hard
---

## Відповідь

High availability frontend: **CDN** edge caching static assets; **multi-region** deploy; **SSR/ISR** з fallback; **health checks** + auto failover; **graceful degradation** (read-only mode); **retry + circuit breaker** на API client; **offline** через Service Worker; **RUM monitoring** (Sentry, Datadog). Scale: horizontal — stateless servers, edge functions; **code splitting** зменшує blast radius; **rate limiting** client-side backoff. SLO: 99.9% uptime, p95 LCP < 2.5s. Регулярний chaos test.

## Приклад

API client with retry + circuit breaker:

```ts
async function fetchWithRetry(url: string, opts: RequestInit, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { ...opts, signal: AbortSignal.timeout(5000) });
      if (res.ok) return res;
      if (res.status < 500) throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 2 ** i * 200));
    }
  }
}
```

CDN cache headers:

```
/assets/*  Cache-Control: public, max-age=31536000, immutable
/api/*     Cache-Control: no-store
/index.html Cache-Control: no-cache
```

## Юз кейси

- Primary region outage: DNS failover на secondary — SW віддає cached shell
- Traffic spike Black Friday: CDN поглинає 90% static, autoscale SSR pods
- Partial API outage: React Query stale data + banner «дані можуть бути застарілими»

## Документація

- [Service Worker API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [HTTP caching — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
