---
title: "Що таке ARIA? Які її основні ролі, стани та властивості?"
topic: frontend
grade: senior
category: "Accessibility"
order: 112
difficulty: hard
---

## Відповідь

**ARIA (Accessible Rich Internet Applications)** — набір атрибутів, що доповнюють HTML, коли нативної семантики недостатньо. Правило №1: **no ARIA is better than bad ARIA** — спочатку `<button>`, `<nav>`, `<main>`. **Roles:** `dialog`, `tablist`, `tab`, `tabpanel`, `menu`, `menuitem`, `alert`, `status`, `search`. **States/properties:** `aria-expanded`, `aria-selected`, `aria-hidden`, `aria-labelledby`, `aria-describedby`, `aria-live` (polite/assertive), `aria-disabled`, `aria-invalid`. Live regions — для toast і dynamic updates без focus steal.

## Приклад

```html
<!-- Accordion — ARIA коли custom markup -->
<div class="accordion">
  <h3>
    <button
      aria-expanded="false"
      aria-controls="panel-1"
      id="trigger-1"
    >
      Розділ 1
    </button>
  </h3>
  <div id="panel-1" role="region" aria-labelledby="trigger-1" hidden>
    Контент розділу
  </div>
</div>

<!-- Live region для toast -->
<div role="status" aria-live="polite" aria-atomic="true">
  Товар додано до кошика
</div>
```

```tsx
// Краще — нативний dialog (браузерна a11y з коробки)
<dialog aria-labelledby="modal-title">
  <h2 id="modal-title">Підтвердження</h2>
  <button>OK</button>
</dialog>
```

## Юз кейси

- Custom tabs: `role="tablist"` + `aria-selected` + keyboard arrows
- Loading spinner: `aria-busy="true"` на region, `aria-live` on complete
- Icon-only button: `aria-label="Закрити"` або visually hidden text

## Документація

- [ARIA — MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [ARIA roles — WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/#roles)
