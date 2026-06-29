---
title: "Як працює gateway?"
topic: nodejs
grade: senior
category: "Мікросервіси"
order: 39
difficulty: medium
---

## Відповідь

API Gateway — єдина точка входу для клієнтів: **routing** до backend-сервісів (path/host-based); **cross-cutting** — TLS termination, auth (перевірка JWT), rate limiting, трансформація request/response; **aggregation** — складання кількох викликів сервісів в одну відповідь (варіант BFF).

Реалізація: Kong, AWS API Gateway, nginx, власний Node (Express/Fastify proxy), Envoy.

Зовнішній vs внутрішній gateway. Уникайте бізнес-логіки в gateway — тонкий routing + policy. Кешування на edge для GET. Circuit breaker коли upstream unhealthy → fallback/503.

## Приклад

```js
// Minimal gateway routing
const routes = {
  '/api/users': 'http://user-service:3001',
  '/api/orders': 'http://order-service:3002',
};

app.use('/api', authenticate, rateLimit, async (req, res) => {
  const target = resolveTarget(req.path, routes);
  return proxy(target, { changeOrigin: true })(req, res);
});
```

## Юз кейси

- Mobile app → один домен, 15 внутрішніх мікросервісів
- Централізована OAuth-валідація перед внутрішньою мережею
- Rate limit на API key на рівні gateway

## Документація

- [API Gateway pattern — microservices.io](https://microservices.io/patterns/apigateway.html)
