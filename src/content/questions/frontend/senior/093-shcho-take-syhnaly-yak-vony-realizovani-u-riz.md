---
title: "Що таке сигнали, як вони реалізовані у різних фреймворках?"
topic: frontend
grade: senior
category: "Фреймворки та бібліотеки"
order: 93
difficulty: hard
---

## Відповідь

**Signals** — fine-grained reactive primitives: при зміні signal value перезапускаються лише dependents (не все component tree). Реалізації: **Solid.js** — `createSignal`, compile-time tracking; **Angular 16+** — `@angular/core` signals (`signal`, `computed`, `effect`); **Vue 3** — `ref`/`reactive` (схожа модель); **Svelte 5 runes** — `$state`, `$derived`; **Preact Signals**, **React experimental** (useSignal proposal). На відміну від React `useState` — re-render component при будь-якій зміні state. Signals виграють у perf з багатьма незалежними reactive values.

## Приклад

Solid signals:

```jsx
import { createSignal, createEffect } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);
  createEffect(() => console.log('count:', count())); // runs only when count changes
  return <button onClick={() => setCount(c => c + 1)}>{count()}</button>;
}
```

Angular signals:

```ts
count = signal(0);
double = computed(() => this.count() * 2);
increment() { this.count.update(c => c + 1); }
```

Template: `{{ double() }}`

## Юз кейси

- High-frequency updates (spreadsheet cells): signals уникають full grid re-render
- Angular migration: поступовий interop signals + RxJS
- Відповідь на співбесіді: React re-render model vs Solid fine-grained graph

## Документація

- [useSyncExternalStore — React](https://react.dev/reference/react/useSyncExternalStore)
- [Signals — Angular](https://angular.dev/guide/signals)
