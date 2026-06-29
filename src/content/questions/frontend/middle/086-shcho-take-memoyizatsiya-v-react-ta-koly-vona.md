---
title: "Що таке мемоїзація в React та коли вона потрібна?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 86
difficulty: medium
---

## Відповідь

Мемоїзація кешує результат обчислення (`useMemo`), функцію (`useCallback`) або весь компонент (`memo`). Потрібна, коли Profiler показує дорогий re-render або нестабільні посилання ламають оптимізацію дочірніх `memo`. Не мемоїзую все підряд — це додає overhead і ускладнює код.

## Приклад

```tsx
const sorted = useMemo(
  () => [...items].sort((a, b) => a.price - b.price),
  [items]
);
const handleSelect = useCallback((id: string) => select(id), [select]);
```

## Юз кейси

- `useMemo` для сортування 1000 товарів у каталозі
- `useCallback` для стабільного handler у `memo`-рядку таблиці
- Спочатку Profiler — потім точкова мемоїзація

## Документація

- [memo — React](https://react.dev/reference/react/memo)
- [useMemo — React](https://react.dev/reference/react/useMemo)
