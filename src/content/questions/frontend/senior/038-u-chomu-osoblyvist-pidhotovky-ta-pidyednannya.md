---
title: "У чому особливість підготовки та під’єднання фронтенд-асетів залежно від використання HTTP1 або HTTP2 на сервері?"
topic: frontend
grade: senior
category: "Performance"
order: 38
difficulty: hard
---

## Відповідь

**HTTP/1.1** — 6 parallel connections per domain → **concatenate** CSS/JS (sprites, bundles), **domain sharding** (cdn1, cdn2), inline critical CSS. **HTTP/2** — multiplexing одного connection → **split bundles** (code splitting OK), **no concatenation benefit**, **no sharding needed** (навіть шкідливо — extra TLS). **HTTP/3** (QUIC) — ще краще на lossy networks. Cache: H2 підтримує same cache headers. Senior на H2+: granular chunks, long cache immutable hashes. Legacy H1: fewer, larger files. Always **brotli/gzip**, **preconnect** to CDN.

## Приклад

HTTP/1 strategy (legacy):

```html
<!-- one bundle — 6 connection limit -->
<link rel="stylesheet" href="/css/all.min.css">
<script src="/js/vendor+app.min.js"></script>
```

HTTP/2 strategy (modern):

```html
<link rel="preconnect" href="https://cdn.example.com">
<!-- many small hashed files — multiplexed -->
<link rel="stylesheet" href="/css/main-a3f2.css">
<link rel="stylesheet" href="/css/checkout-b1c4.css">
<script type="module" src="/js/app-d8e1.js"></script>
<script type="module" src="/js/checkout-f2a3.js"></script>
```

## Юз кейси

- Migration H1→H2: прибрати webpack concat plugin, увімкнути route-based splitting
- CDN config: H2 push deprecated — використовувати `<link rel="preload">`
- Dev vs prod: local HTTP/1.1 може ховати bundling issues — тест на staging H2

## Документація

- [HTTP/2 — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http2_frames)
- [Optimize resource loading — web.dev](https://web.dev/learn/performance/optimize-resource-loading)
