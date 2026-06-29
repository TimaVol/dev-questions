---
title: "Що таке side effects? З якими інструментами є досвід?"
topic: frontend
grade: middle
category: "Фреймворки та бібліотеки"
order: 79
difficulty: medium
---

## Відповідь

Side effect — будь-яка операція поза чистим render: fetch, підписки, таймери, зміна document.title. У React — `useEffect` (після paint), `useLayoutEffect` (до paint, для вимірювань DOM), обробники подій. Strict Mode у dev викликає effects двічі — перевіряю cleanup.

## Приклад

```tsx
useEffect(() => {
  const sub = eventBus.on('order:created', handleOrder);
  return () => sub.unsubscribe();
}, [handleOrder]);
```

## Юз кейси

- `useEffect` для підписки на WebSocket
- `useLayoutEffect` для вимірювання висоти перед анімацією
- Обробник `click` для відправки форми — effect не потрібен

## Документація

- [useEffect — React](https://react.dev/reference/react/useEffect)
