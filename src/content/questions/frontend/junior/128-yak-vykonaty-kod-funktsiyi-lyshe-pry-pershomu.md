---
title: "Як виконати код функції лише при першому рендері компонента?"
topic: frontend
grade: junior
category: "Фреймворки та бібліотеки"
order: 128
difficulty: easy
---

## Відповідь

`useEffect` з порожнім масивом залежностей `[]` — виконається один раз після mount. Аналог `componentDidMount`.

## Приклад

```jsx
useEffect(() => {
  fetch('/api/config').then(r => r.json()).then(setConfig);
}, []);
```

## Юз кейси

- Завантаження даних при відкритті сторінки
- Ініціалізація аналітики або third-party SDK

## Документація

- [useEffect — React](https://react.dev/reference/react/useEffect)
