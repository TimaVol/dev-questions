---
title: "Уявіть, що я — клієнт, який нічого не знає про доступність і ніколи про це не замислювався. Переконайте мене, чому доступність — це важливо і чому я маю витрачати на це додаткові гроші."
topic: frontend
grade: senior
category: "Accessibility"
order: 115
difficulty: hard
---

## Відповідь

Доступність — не «галочка для інвалідів», а **якість продукту для всіх**. 15–20% населення мають формальну інвалідність; ще більше — тимчасові обмеження (зламаний палець, сонце на екрані, шумне метро). Доступний сайт: **більша аудиторія**, **кращий SEO** (семантика, alt), **менше support tickets** («не можу оформити замовлення»), **legal protection** (EAA в ЄС, ADA позови). Вартість: fix a11y на етапі дизайну — +5–10% часу; fix після launch — +30–50% refactor. ROI: conversion rate +2–4% на accessible checkout — окупає інвестицію. Це як пандус у будівлі — корисний усім з візком, валізою, велосипедом.

## Приклад

```markdown
**Бізнес-кейс для клієнта:**

Проблема: 8% users drop off на checkout step 2 (form errors, no labels).
Аудит: screen reader не бачить поле «CVV», contrast кнопки 2.8:1.

Рішення: 2 спринти a11y fix — labels, focus, contrast, error announcements.
Вартість: ~€8k.

Очікуваний ефект:
- Checkout completion +3% = +€120k/рік (при вашому GMV)
- Уникнення EAA fine risk (EU market)
- Brand reputation
```

Технічно це не «окремий проєкт» — семантичний HTML і keyboard nav у кожній фічі.

## Юз кейси

- E-commerce EU: EAA з 2025 — non-compliance = market lockout risk
- B2B tender: accessibility statement required to win contract
- Mobile users: large touch targets + contrast — a11y overlaps mobile UX
