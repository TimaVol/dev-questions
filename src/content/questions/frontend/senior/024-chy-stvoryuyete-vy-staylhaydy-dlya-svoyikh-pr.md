---
title: "Чи створюєте ви стайлгайди для своїх проєктів?"
topic: frontend
grade: senior
category: "HTML/CSS"
order: 24
difficulty: medium
---

## Відповідь

Style guide — living documentation дизайн-системи: **tokens** (color, spacing, typography), **components** (Button, Input, Modal), **patterns** (forms, tables, empty states), **do/don't** приклади. Інструменти: **Storybook** (interactive), **Figma + Zeroheight**, **custom docs site** (Astro/Docusaurus). Senior забезпечує: sync Figma ↔ code tokens, visual regression (Chromatic), a11y checklist per component, contribution guide. Style guide без adoption — мертвий документ; потрібен owner і CI gate (новий UI — через design system).

## Приклад

Storybook story з controls і a11y addon:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: { variant: { control: 'select', options: ['primary', 'ghost'] } },
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: { children: 'Зберегти', variant: 'primary' },
};
```

Tokens у CSS:

```css
:root {
  --color-primary: oklch(0.55 0.2 250);
  --space-md: 1rem;
  --radius-md: 8px;
}
```

## Юз кейси

- New feature: designer + dev перевіряють Storybook перед merge, не Figma screenshot
- Onboarding: junior копіює `<Button>` з docs, не пише `.btn-blue` з нуля
- Rebrand: зміна tokens — один PR, cascade на всі components

## Документація

- [Design tokens — web.dev](https://web.dev/learn/design-systems/design-tokens/)
- [Storybook — Documentation](https://storybook.js.org/docs)
