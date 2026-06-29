---
title: "Що таке React Context, коли його використовуєте?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 85
difficulty: medium
---

## Відповідь

Context передає дані вглиб дерева без prop drilling — тема, locale, поточний user. Мінус: зміна value re-renderить усіх consumers. Підходить для рідко оновлюваних даних. Для частих оновлень (кошик, нотифікації) — Zustand, Redux або розділені контексти.

## Приклад

```tsx
const ThemeContext = createContext<'light' | 'dark'>('light');

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar onToggle={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} />
    </ThemeContext.Provider>
  );
}
```

## Юз кейси

- ThemeProvider для світлої/темної теми
- i18n locale для всього застосунку
- Auth user після логіну (оновлення рідке)

## Документація

- [Context — React](https://react.dev/learn/passing-data-deeply-with-context)
