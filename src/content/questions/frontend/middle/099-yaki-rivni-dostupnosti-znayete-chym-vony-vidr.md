---
title: "Які рівні доступності знаєте? Чим вони відрізняються?"
topic: frontend
grade: middle
category: "Accessibility"
order: 99
difficulty: easy
---

## Відповідь

WCAG має рівні **A** (мінімум), **AA** (стандарт для більшості продуктів), **AAA** (найсуворіший). AA — типова ціль: контраст тексту 4.5:1, клавіатурна навігація, alt для зображень. AAA (7:1 контраст) — рідко для всього UI, частіше для окремих елементів.

## Приклад

```html
<!-- AA: контраст #2563eb на #fff ≈ 4.6:1 -->
<button style="background:#2563eb;color:#fff;padding:0.5rem 1rem">
  Купити
</button>
```

## Юз кейси

- E-commerce таргетує WCAG 2.1 AA
- Аудит з axe DevTools перед релізом
- Юридичні вимоги ЄС для державних порталів

## Документація

- [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/)
- [Understanding WCAG — W3C](https://www.w3.org/WAI/WCAG22/Understanding/)
