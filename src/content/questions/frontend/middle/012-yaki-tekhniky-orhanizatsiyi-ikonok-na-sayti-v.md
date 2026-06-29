---
title: "Які техніки організації іконок на сайті ви знаєте? Назвіть плюси та мінуси кожної."
topic: frontend
grade: middle
category: "HTML/CSS"
order: 12
difficulty: medium
---

## Відповідь

**Inline SVG** — стилізація через CSS, a11y. **SVG sprite** — один HTTP-запит, `<use href="#icon">`. **Icon font** — застарілий, гірша a11y. **React-компоненти** (lucide) — tree-shaking, TypeScript.

## Приклад

```tsx
function Icon({ name }: { name: 'cart' | 'user' }) {
  return (
    <svg aria-hidden="true" className="icon">
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
```

## Юз кейси

- Design system з єдиним набором іконок
- `currentColor` для темної/світлої теми
- Sprite для десятків іконок без icon font

## Документація

- [SVG — MDN](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [SVG use — MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use)
