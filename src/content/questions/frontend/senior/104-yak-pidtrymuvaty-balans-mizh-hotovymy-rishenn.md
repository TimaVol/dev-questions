---
title: "Як підтримувати баланс між готовими рішеннями та розробкою власних рішень у проєктах? Як варто ухвалювати рішення щодо вибору?"
topic: frontend
grade: senior
category: "Архітектура"
order: 104
difficulty: hard
---

## Відповідь

Framework рішення: **build vs buy vs adapt**. Buy (npm/SaaS) коли: commodity (auth, analytics, date picker), maintenance cost > license, time-to-market критичний. Build коли: core differentiator, немає fit, vendor lock-in неприйнятний, strict compliance. Adapt (fork/wrap) коли: 80% fit. Процес: spike 1–2 дні, TCO estimate (3 роки), exit strategy, ADR. «Not invented here» і «npm everything» — обидва провали. Senior питає: «чи це наш competitive advantage?»

## Приклад

ADR template:

```markdown
# ADR-012: Date picker

## Context
Need accessible date range for reports.

## Options
1. react-day-picker (MIT, a11y good) — 2 days integrate
2. Custom — 2 weeks + ongoing a11y maintenance
3. MUI DatePicker — +40KB, design mismatch

## Decision
react-day-picker + our tokens wrapper.

## Consequences
Save ~1.5 weeks; upgrade path via semver.
```

Build example — custom pricing engine (core IP):
```
Buy: Stripe Elements (payment UI)
Build: dynamic pricing rules engine (business specific)
```

## Юз кейси

- Auth: buy Clerk/Auth0 — не будувати OAuth з нуля
- Data grid 10 custom columns: розширити TanStack Table vs build from zero
- Перегляд ADR щороку — «still right?» запобігає sacred cows

## Документація

- [HTTP Authentication — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [npm guide — Node.js](https://nodejs.org/en/docs/guides/getting-started-guide)
