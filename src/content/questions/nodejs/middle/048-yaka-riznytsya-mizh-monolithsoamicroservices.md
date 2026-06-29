---
title: "Яка різниця між Monolith/SOA/Microservices?"
topic: nodejs
grade: middle
category: "Мікросервіси"
order: 48
difficulty: medium
---

## Відповідь

**Monolith** — один deployable unit, shared codebase і DB. Простий dev/deploy, але scaling і team autonomy обмежені.

**SOA (Service-Oriented Architecture)** — coarse-grained services через ESB/message bus, часто enterprise integration. Більші сервіси ніж microservices.

**Microservices** — маленькі autonomous services, окремий deploy, own DB (ideally), communication через HTTP/gRPC/events. Незалежне масштабування, але operational complexity (network, distributed tracing, deployment).

Evolution path: monolith → modular monolith → extract hot services → microservices.

## Приклад

```
Monolith:     [ API + Auth + Orders + Payments ] → one Postgres

Microservices:
  order-service:3001  ─┐
  payment-service:3002 ─┼→ API Gateway → clients
  user-service:3003   ─┘
  (each with own DB)
```

## Юз кейси

- Start monolith, split when team/scale demands
- SOA legacy bank integrations
- Microservices: Netflix, Uber scale (not for 3-person startup)

## Документація

- [Microservices — martinfowler.com](https://martinfowler.com/articles/microservices.html)
- [Monolith vs Microservices](https://martinfowler.com/bliki/MonolithFirst.html)
