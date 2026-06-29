---
title: "Що таке ре-рендер компонента, коли він відбувається чи можна вплинути на цей процес?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 84
difficulty: medium
---

## Відповідь

Re-render — повторний виклик функції компонента, коли змінились state, props або context, або коли re-renderився батько. На процес впливають: `React.memo`, стабільні посилання (`useCallback`/`useMemo`), розділення Context. Не кожен re-render — проблема; оптимізую лише виміряні вузькі місця.

## Приклад

```tsx
const Child = memo(function Child({ value }: { value: number }) {
  return <span>{value}</span>;
});
// Re-render Child лише коли value змінився
```

## Юз кейси

- Profiler показує зайві re-renders таблиці
- `memo` + стабільний callback від батька
- Розділення ThemeContext і UserContext

## Документація

- [memo — React](https://react.dev/reference/react/memo)
