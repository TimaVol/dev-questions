---
title: "З якими проблемами в React-компонентах часто стикались?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 76
difficulty: medium
---

## Відповідь

Часті проблеми: prop drilling, stale closure у `useEffect`, пропущені deps, `key={index}` у списках, зайві re-renders, memory leaks без cleanup. Рішення: lift state, Context/Zustand, правильні deps, стабільні keys, `AbortController` у cleanup, Profiler для діагностики.

## Приклад

```tsx
useEffect(() => {
  const ctrl = new AbortController();
  fetch(url, { signal: ctrl.signal });
  return () => ctrl.abort();
}, [url]);
```

## Юз кейси

- Виправлення missing deps після ESLint `react-hooks/exhaustive-deps`
- Cleanup підписки WebSocket при unmount
- Стабільний `key={item.id}` замість index у динамічному списку

## Документація

- [Rules of Hooks — React](https://react.dev/reference/rules)
- [Preserving and resetting state — React](https://react.dev/learn/preserving-and-resetting-state)
