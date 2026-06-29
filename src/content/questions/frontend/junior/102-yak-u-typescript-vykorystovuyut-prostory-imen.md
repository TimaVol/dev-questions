---
title: "Як у TypeScript використовують простори імен і модулі?"
topic: frontend
grade: junior
category: "TypeScript"
order: 102
difficulty: medium
---

## Відповідь

ES modules (`import`/`export`) — стандарт. `namespace` — застарілий підхід для глобального scope без bundler. У сучасних проєктах — тільки modules.

## Приклад

```ts
// utils/format.ts
export function formatPrice(cents: number) {
  return (cents / 100).toFixed(2);
}

// app.ts
import { formatPrice } from './utils/format';
```

## Юз кейси

- Barrel export: `index.ts` реекспортує модулі папки
- `import type` для type-only імпортів без runtime-коду

## Документація

- [Modules — TypeScript](https://www.typescriptlang.org/docs/handbook/2/modules.html)
- [Namespaces — TypeScript](https://www.typescriptlang.org/docs/handbook/namespaces.html)
