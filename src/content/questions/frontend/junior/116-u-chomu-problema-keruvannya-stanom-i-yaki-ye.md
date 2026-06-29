---
title: "У чому проблема керування станом і які є підходи до її вирішення?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 116
difficulty: medium
---

## Відповідь

Стан розмазується між компонентами, prop drilling, складно синхронізувати. Рішення: підняти стан вгору, Context API, Zustand/Redux для глобального стану, React Query для серверного стану.

## Приклад

```jsx
const ThemeContext = createContext('light');
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

## Юз кейси

- Context — тема, мова, авторизація
- React Query — кеш API-даних і синхронізація

## Документація

- [Managing state — React](https://react.dev/learn/managing-state)
- [Context — React](https://react.dev/learn/passing-data-deeply-with-context)
