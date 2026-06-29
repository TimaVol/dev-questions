---
title: "Що таке React-хуки, які вбудовані хуки використовуєте?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 130
difficulty: easy
---

## Відповідь

Хуки — функції для стану й side effects у функціональних компонентах. Основні: `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`. Правило: тільки на верхньому рівні, не в умовах.

## Приклад

```jsx
function Timer() {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSec(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{sec}s</span>;
}
```

## Юз кейси

- `useState` — будь-який локальний стан
- `useRef` — доступ до DOM або збереження значення без ререндеру

## Документація

- [Rules of Hooks — React](https://react.dev/reference/rules)
- [Hooks — React](https://react.dev/reference/react/hooks)
