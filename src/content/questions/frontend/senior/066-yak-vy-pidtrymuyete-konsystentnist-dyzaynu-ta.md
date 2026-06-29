---
title: "Як ви підтримуєте консистентність дизайну та стилізації великих кодових баз React-проєктів? Які підходи або інструменти використовуєте для підтримання єдності інтерфейсу користувача?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 66
difficulty: hard
---

## Відповідь

Стек консистентності: **design tokens** (CSS variables / Tailwind theme), **component library** (внутрішній Storybook), **eslint rules** (без raw hex colors), **Figma ↔ code sync** (Tokens Studio), **Chromatic** visual regression, **PR checklist** (використання design system components). Архітектура: пакет `@company/ui` у monorepo. Заборона one-off `.btn-blue` — розширювати `<Button variant="primary">`. Документувати spacing scale (4px grid). Code review відхиляє inline styles, окрім динамічних значень.

## Приклад

Shared tokens + component:

```tsx
// packages/ui/src/Button.tsx
const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  ghost: 'bg-transparent text-brand-600 hover:bg-brand-50',
} as const;

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <button className={cn('rounded-md px-4 py-2 font-medium', variants[variant])} {...props} />;
}
```

ESLint custom rule / code review bot:

```js
// flag: style={{ color: '#2563eb' }}
// require: className="text-brand-600" or variant prop
```

## Юз кейси

- Rebrand: змінити `--color-brand` у tokens — оновлюється весь app
- Новий інженер: Storybook docs — копіювати `<Button>`, а не raw `<button className="...">`
- Visual regression: неочікувана зміна padding спіймана в Chromatic PR check

## Документація

- [Design tokens — web.dev](https://web.dev/learn/design-systems/design-tokens/)
- [Storybook — Documentation](https://storybook.js.org/docs)
