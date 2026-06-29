---
title: "Як виконати код перед видаленням компонента з дерева?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 87
difficulty: medium
---

## Відповідь

Cleanup-функція в `useEffect`/`useLayoutEffect` викликається перед unmount компонента і перед наступним запуском effect (якщо змінились deps). Тут знімають підписки, очищають таймери, скасовують fetch через `AbortController`, закривають WebSocket.

## Приклад

```tsx
useEffect(() => {
  const timer = setInterval(() => tick(), 1000);
  return () => clearInterval(timer);
}, []);
```

## Юз кейси

- `clearInterval` при виході зі сторінки з таймером
- `AbortController.abort()` при unmount під час fetch
- `socket.close()` при закритті чату

## Документація

- [useEffect — React](https://react.dev/reference/react/useEffect)
