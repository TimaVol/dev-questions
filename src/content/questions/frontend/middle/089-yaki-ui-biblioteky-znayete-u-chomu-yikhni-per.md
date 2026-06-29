---
title: "Які UI-бібліотеки знаєте, у чому їхні переваги та недоліки?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 89
difficulty: medium
---

## Відповідь

**MUI** — повний набір, швидкий старт, але великий bundle і «material»-вигляд. **Chakra** — accessible, themeable. **shadcn/ui** — copy-paste компоненти на Radix + Tailwind, ви володієте кодом. **Ant Design** — enterprise, важкий. Вибір за дизайном, a11y і bundle budget.

## Приклад

```tsx
import { Button } from '@/components/ui/button';

export function CheckoutActions() {
  return (
  <>
    <Button variant="outline">Скасувати</Button>
    <Button>Оплатити</Button>
  </>
  );
}
```

## Юз кейси

- shadcn для кастомної дизайн-системи стартапу
- MUI для швидкого admin MVP за тиждень
- Radix primitives для accessible dropdown без стилів

## Документація

- [MUI — Getting started](https://mui.com/material-ui/getting-started/)
- [Radix UI — Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
