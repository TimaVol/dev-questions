---
title: "Як обробляєте помилки в застосунку?"
topic: frontend
grade: middle
category: "JavaScript"
order: 52
difficulty: medium
---

## Відповідь

try/catch на async, Error Boundary у React, централізований HTTP error handler, user-friendly повідомлення, лог у Sentry/Datadog. Не ковтати помилки — показувати fallback UI.

## Приклад

```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? <p>Щось пішло не так</p> : this.props.children;
  }
}
```

## Юз кейси

- Error Boundary навколо route
- Sentry для production errors
- Toast для 4xx/5xx API

## Документація

- [try/catch — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
