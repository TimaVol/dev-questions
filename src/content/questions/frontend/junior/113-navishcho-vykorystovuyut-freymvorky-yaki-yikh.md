---
title: "Навіщо використовують фреймворки, які їхні переваги та недоліки?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 113
difficulty: easy
---

## Відповідь

Фреймворки дають структуру, компоненти, роутинг, state management, екосистему. Плюси — швидша розробка, конвенції. Мінуси — bundle size, крива навчання, прив'язка до фреймворку.

## Приклад

```jsx
// React — декларативний UI з компонентами
function App() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Юз кейси

- SPA з десятками екранів — React/Vue замість vanilla JS
- Landing page — можна обійтись без фреймворку

## Документація

- [Managing state — React](https://react.dev/learn/managing-state)
- [Vue — Components](https://vuejs.org/guide/essentials/component-basics.html)
