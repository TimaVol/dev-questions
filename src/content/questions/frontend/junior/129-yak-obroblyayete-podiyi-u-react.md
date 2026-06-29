---
title: "Як обробляєте події у React?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 129
difficulty: easy
---

## Відповідь

Synthetic events — `onClick`, `onChange`, `onSubmit`. Передавай handler як prop: `onClick={handleClick}`. Для форм — `onSubmit` з `e.preventDefault()`. React нормалізує події між браузерами.

## Приклад

```jsx
function SearchBox() {
  const handleChange = (e) => setQuery(e.target.value);
  return <input onChange={handleChange} placeholder="Пошук" />;
}
```

## Юз кейси

- `onSubmit` форми з preventDefault для SPA
- `onClick` з `stopPropagation` у вкладеному dropdown

## Документація

- [Responding to Events — React](https://react.dev/learn/responding-to-events)
