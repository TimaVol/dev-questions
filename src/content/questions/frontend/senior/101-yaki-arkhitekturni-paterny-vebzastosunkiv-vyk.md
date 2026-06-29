---
title: "Які архітектурні патерни вебзастосунків використовували та які їхні переваги?"
topic: frontend
grade: senior
category: "Архітектура"
order: 101
difficulty: hard
---

## Відповідь

Патерни з production: **Layered** (UI → hooks → services → API); **Feature-Sliced Design**; **Microfrontends** (Module Federation); **Jamstack** (static + APIs); **Islands architecture** (Astro); **BFF**; **Event-driven UI** (WebSocket/SSE); **CQRS-lite** (React Query read, mutations write). Переваги задокументовані в ADR. Senior обирає патерн під біль: MFE коли потрібен **independent deploy**; BFF коли **mobile/web різні shapes**; FSD коли **велика команда** потребує import rules.

## Приклад

Feature-Sliced layers:

```
shared/     — ui kit, lib (no business logic)
entities/   — User, Product models + api
features/   — add-to-cart, login
widgets/    — header, product-grid
pages/      — route compositions
app/        — providers, router
```

Import rule: upper layers import lower only (`pages → widgets → features → entities → shared`).

Jamstack product page:

```
/build → static HTML from CMS webhook
/api/cart → serverless function
Client hydrates cart widget only (island)
```

## Юз кейси

- E-commerce: Jamstack PLP (static) + SPA checkout (dynamic)
- Acquisition: дві команди → microfrontend shell + remote checkout team
- Startup: layered feature folders — достатньо до 20+ devs

## Документація

- [Jamstack — jamstack.org](https://jamstack.org/)
- [Micro-frontends — martinfowler.com](https://martinfowler.com/articles/micro-frontends.html)
