---
title: "Як ви розрізняєте класові та функціональні компоненти в React? В яких випадках вважаєте за доцільне використовувати той або інший тип компонента?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 124
difficulty: medium
---

## Відповідь

Класові — `class extends Component`, lifecycle-методи, `this.state`. Функціональні — функції + хуки. Сьогодні — тільки функціональні; класові лише в legacy-коді.

## Приклад

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Юз кейси

- Новий код — завжди функціональні компоненти
- Legacy class component — мігрувати при рефакторингу

## Документація

- [Class components — React](https://react.dev/reference/react/Component)
