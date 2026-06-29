---
title: "Чи знаєте ви особливості законодавства щодо доступності вебсайтів?"
topic: frontend
grade: senior
category: "Accessibility"
order: 114
difficulty: medium
---

## Відповідь

Глобально: **WCAG 2.1/2.2** (рівні A, AA, AAA) — де-факто стандарт; **ADA** (США) — судові позови за inaccessible sites; **Section 508** — держсектор США; **EAA (European Accessibility Act)** — з 2025 обов'язковий для e-commerce, banking, e-books у ЄС; **EN 301 549** — технічний стандарт ЄС. Україна: Закон «Про основи соціальної захищеності осіб з інвалідністю», держсайти мають вимоги доступності. Практично: ціль **WCAG 2.1 AA** для комерційних продуктів — контраст 4.5:1, keyboard nav, alt text, forms labels. Legal ≠ checkbox — це risk management + правильна UX для всіх.

## Приклад

```markdown
## WCAG 2.1 AA — мінімум для e-commerce EU (EAA)

| Критерій | Вимога | Приклад |
|----------|--------|---------|
| 1.1.1 | Alt для images | product.img має опис |
| 1.4.3 | Contrast 4.5:1 | #595959 on white ✓ |
| 2.1.1 | Keyboard | checkout без миші |
| 2.4.7 | Focus visible | outline не прибраний |
| 3.3.2 | Labels | <label for="email"> |
| 4.1.2 | Name, role, value | custom select з ARIA |
```

Audit tools: axe DevTools, WAVE, manual screen reader test.

## Юз кейси

- EU e-commerce launch: WCAG AA audit перед EAA deadline
- Government tender Ukraine: вимога доступності — document compliance level
- US enterprise client: VPAT (Voluntary Product Accessibility Template) request
