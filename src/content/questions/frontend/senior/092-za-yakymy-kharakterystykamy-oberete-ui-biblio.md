---
title: "За якими характеристиками оберете UI-бібліотеку для нового проєкту?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 92
difficulty: medium
---

## Відповідь

Критерії UI lib: **accessibility** (Radix/React Aria primitives), **customization** (headless vs styled), **bundle size**, **design match** (Material vs custom), **component coverage** (DataGrid, DatePicker?), **TypeScript**, **tree-shaking**, **maintenance** (MUI vs shadcn copy-paste), **license**, **i18n/RTL**. shadcn/ui + Radix — популярно для custom design systems. MUI/Ant — швидкі admin UIs. Chakra — middle ground. Senior обирає **headless + own tokens** для brand-heavy products.

## Приклад

Headless + Tailwind (shadcn pattern):

```tsx
import * as Dialog from '@radix-ui/react-dialog';

export function Modal({ open, onOpenChange, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

Evaluation: run axe on Storybook stories of Button, Dialog, Combobox before commit.

## Юз кейси

- Custom brand: shadcn — власний CSS, без боротьби з MUI theme overrides
- Internal admin fast: MUI DataGrid Pro — license варта timeline
- a11y requirement WCAG AA: Radix primitives + automated axe у CI

## Документація

- [MUI — Getting started](https://mui.com/material-ui/getting-started/)
