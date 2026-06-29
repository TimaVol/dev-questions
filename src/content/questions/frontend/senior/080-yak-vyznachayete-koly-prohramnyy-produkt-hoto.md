---
title: "Як визначаєте, коли програмний продукт готовий до випуску? Які критерії «зеленого світла» для релізу використовуєте?"
topic: frontend
grade: senior
category: "Тестування"
order: 80
difficulty: medium
---

## Відповідь

Release checklist (Definition of Done для release): **усі P0/P1 bugs закриті** або явно waived; **e2e smoke green** на staging; **performance budget** виконано (LCP, bundle size); **a11y** без critical issues; **security** scan чистий (npm audit, SAST); **feature flags** готові для rollback; **monitoring** (Sentry, analytics) перевірено; **rollback plan** задокументовано; **QA sign-off** + PM accept criteria. Не «zero bugs ever» — risk-based waiver з owner. Canary deploy: 5% traffic, спостерігати error rate 30 хв.

## Приклад

Release gate checklist:

```markdown
## v2.4.0 Release — 2024-06-15

- [x] CHANGELOG updated
- [x] E2E smoke: checkout, login, search — PASS
- [x] Lighthouse staging: LCP 1.8s (< 2.5s)
- [x] Bundle: main.js 185KB (< 200KB budget)
- [x] axe: 0 critical/serious
- [x] Sentry: no new issues in staging 48h
- [x] Feature flag `new-checkout` — off by default, ready
- [x] Rollback: revert commit abc123, ~3 min deploy
- [ ] Waived: P2 UI glitch #442 — fix in 2.4.1 (@maria approved)
```

Canary metrics watch:

```
Error rate < 0.1% (baseline 0.05%)
p95 API latency < 500ms
Zero payment failures
```

## Юз кейси

- Hotfix release: скорочений checklist — smoke + security only, full regression на наступному train
- Big bang заборонено: feature flag gradual rollout 5% → 25% → 100%
- Friday deploy: лише якщо auto-rollback + on-call підтверджено

## Документація

- [npm guide — Node.js](https://nodejs.org/en/docs/guides/getting-started-guide)
- [Diagnostics — Node.js](https://nodejs.org/en/docs/guides/diagnostics)
